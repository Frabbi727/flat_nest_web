"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

async function compressImage(file: File, maxKB = 500): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onerror = () => reject(new Error("Image could not be loaded"));
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, Math.sqrt((maxKB * 1024) / file.size));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(img.src);
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("Failed to compress image")); return; }
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.85
        );
      } catch (err) {
        reject(err);
      }
    };
    img.src = URL.createObjectURL(file);
  });
}

export default function RegisterAvatarPage() {
  const { registerStep3, registerStep3Pending, skipStep3 } = useAuthVM();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke the previous preview URL when it changes to avoid memory leaks
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!ALLOWED_TYPES.includes(f.type)) {
      setFileError("Only JPG, PNG, or WebP images are allowed.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`Image must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setFileError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      registerStep3(compressed);
    } catch {
      setFileError("Failed to process image. Please try a different file.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Step indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step 3 of 3</span>
            <span>Photo</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className="h-1 flex-1 rounded-full bg-primary" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Add a photo</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Help others recognise you (optional)
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-border hover:border-primary transition-colors overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="avatar preview"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <Camera className="w-8 h-8 text-muted-foreground" />
            )}
          </button>

          {fileError && (
            <p className="text-destructive text-xs text-center">{fileError}</p>
          )}

          <p className="text-xs text-muted-foreground text-center">
            JPG, PNG or WebP · Max 5MB
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />

        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!file || registerStep3Pending}
          >
            {registerStep3Pending ? "Uploading…" : "Continue"}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={skipStep3}
            disabled={registerStep3Pending}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
