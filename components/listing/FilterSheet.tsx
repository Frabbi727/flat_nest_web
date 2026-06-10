"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import type { ListingFilters } from "@/types/filters";
import type { Amenity, GeoItem, ListingFacing } from "@/types/api";

interface Props {
  filters: ListingFilters;
  amenities: Amenity[];
  facings?: ListingFacing[];
  divisions?: GeoItem[];
  onApply: (filters: ListingFilters) => void;
  children?: React.ReactNode;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
] as const;

function countActiveFilters(filters: ListingFilters): number {
  // search & listing_type_id live outside the sheet (search bar / type chips)
  const { search, listing_type_id, ...sheetFilters } = filters;
  return Object.values(sheetFilters).filter(
    (v) => v !== undefined && v !== ""
  ).length;
}

export default function FilterSheet({
  filters,
  amenities,
  facings = [],
  divisions: initialDivisions = [],
  onApply,
  children,
}: Props) {
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<ListingFilters>(filters);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  const activeCount = countActiveFilters(filters);

  const handleOpen = () => {
    if (!isAuthenticated) {
      openAuthModal("Sign in to filter and search listings.");
      return;
    }
    // Re-sync draft state with the currently applied filters
    setLocal(filters);
    setSelectedAmenities(
      filters.amenities ? filters.amenities.split(",").map(Number) : []
    );
    setOpen(true);
  };

  // Geo cascade (spec §6): Division → District → Upazila → Union
  const { data: divisions = initialDivisions } = useQuery<GeoItem[]>({
    queryKey: ["geo-divisions"],
    queryFn: () => api.get("/geo/divisions").then((r) => r.data.data),
    initialData: initialDivisions.length ? initialDivisions : undefined,
    staleTime: Infinity,
    enabled: open,
  });
  const { data: districts = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-districts", local.division_id],
    queryFn: () =>
      api.get(`/geo/districts/${local.division_id}`).then((r) => r.data.data),
    staleTime: Infinity,
    enabled: open && !!local.division_id,
  });
  const { data: upazilas = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-upazilas", local.district_id],
    queryFn: () =>
      api.get(`/geo/upazilas/${local.district_id}`).then((r) => r.data.data),
    staleTime: Infinity,
    enabled: open && !!local.district_id,
  });
  const { data: unions = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-unions", local.upazila_id],
    queryFn: () =>
      api.get(`/geo/unions/${local.upazila_id}`).then((r) => r.data.data),
    staleTime: Infinity,
    enabled: open && !!local.upazila_id,
  });

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply({
      ...local,
      amenities: selectedAmenities.length
        ? selectedAmenities.join(",")
        : undefined,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setLocal({});
    setSelectedAmenities([]);
    onApply({});
  };

  const selectClass =
    "w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      {children ? (
        <div onClick={handleOpen} className="contents">{children}</div>
      ) : (
        <Button variant="outline" size="sm" onClick={handleOpen}>
          <SlidersHorizontal className="w-4 h-4 mr-1" />
          Filter
          {activeCount > 0 && (
            <Badge className="ml-1 h-5 min-w-5 rounded-full px-1.5">
              {activeCount}
            </Badge>
          )}
        </Button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter Listings</SheetTitle>
          </SheetHeader>
          <div className="space-y-5 py-4">
            {/* Location — geo cascade */}
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="grid grid-cols-2 gap-3">
                <select
                  className={selectClass}
                  value={local.division_id ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      division_id: Number(e.target.value) || undefined,
                      district_id: undefined,
                      upazila_id: undefined,
                      union_id: undefined,
                    }))
                  }
                >
                  <option value="">Division</option>
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <select
                  className={selectClass}
                  value={local.district_id ?? ""}
                  disabled={!local.division_id}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      district_id: Number(e.target.value) || undefined,
                      upazila_id: undefined,
                      union_id: undefined,
                    }))
                  }
                >
                  <option value="">District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <select
                  className={selectClass}
                  value={local.upazila_id ?? ""}
                  disabled={!local.district_id}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      upazila_id: Number(e.target.value) || undefined,
                      union_id: undefined,
                    }))
                  }
                >
                  <option value="">Upazila / Thana</option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
                <select
                  className={selectClass}
                  value={local.union_id ?? ""}
                  disabled={!local.upazila_id}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      union_id: Number(e.target.value) || undefined,
                    }))
                  }
                >
                  <option value="">Union (optional)</option>
                  {unions.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Min Price (৳)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 10000"
                  value={local.price_min ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      price_min: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Max Price (৳)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 40000"
                  value={local.price_max ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      price_max: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  placeholder="e.g. 2"
                  value={local.beds ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      beds: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Bathrooms</Label>
                <Input
                  type="number"
                  placeholder="e.g. 1"
                  value={local.baths ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      baths: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Min Size (sqft)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 800"
                  value={local.size_min ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      size_min: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Max Size (sqft)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 2000"
                  value={local.size_max ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      size_max: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Min Floor</Label>
                <Input
                  type="number"
                  placeholder="e.g. 1"
                  value={local.floor_min ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      floor_min: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Max Floor</Label>
                <Input
                  type="number"
                  placeholder="e.g. 8"
                  value={local.floor_max ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      floor_max: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </div>
            </div>

            {facings.length > 0 && (
              <div className="space-y-1">
                <Label>Facing</Label>
                <select
                  className={selectClass}
                  value={local.facing_id ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      facing_id: Number(e.target.value) || undefined,
                    }))
                  }
                >
                  <option value="">Any direction</option>
                  {facings.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Available from</Label>
                <Input
                  type="date"
                  value={local.available_from_start ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      available_from_start: e.target.value || undefined,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Available until</Label>
                <Input
                  type="date"
                  value={local.available_from_end ?? ""}
                  onChange={(e) =>
                    setLocal((p) => ({
                      ...p,
                      available_from_end: e.target.value || undefined,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Sort by</Label>
              <select
                className={selectClass}
                value={local.sort_by ?? ""}
                onChange={(e) =>
                  setLocal((p) => ({
                    ...p,
                    sort_by: (e.target.value ||
                      undefined) as ListingFilters["sort_by"],
                  }))
                }
              >
                <option value="">Default</option>
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {amenities.length > 0 && (
              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <Badge
                      key={a.id}
                      variant={
                        selectedAmenities.includes(a.id) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleAmenity(a.id)}
                    >
                      {a.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button className="flex-1" onClick={handleApply}>
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
