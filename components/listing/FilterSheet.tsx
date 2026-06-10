"use client";

import { useState } from "react";
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
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import type { ListingFilters } from "@/types/filters";
import type { Amenity } from "@/types/api";

interface Props {
  filters: ListingFilters;
  amenities: Amenity[];
  onApply: (filters: ListingFilters) => void;
  children?: React.ReactNode;
}

export default function FilterSheet({ filters, amenities, onApply, children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<ListingFilters>(filters);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  const handleOpen = () => {
    if (!isAuthenticated) {
      openAuthModal("Sign in to filter and search listings.");
      return;
    }
    setOpen(true);
  };

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

  return (
    <>
      {children ? (
        <div onClick={handleOpen} className="contents">{children}</div>
      ) : (
        <Button variant="outline" size="sm" onClick={handleOpen}>
          <SlidersHorizontal className="w-4 h-4 mr-1" />
          Filter
        </Button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter Listings</SheetTitle>
          </SheetHeader>
          <div className="space-y-5 py-4">
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
