"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function RegisterAvatarPage() {
  const { registerStep3, registerStep3Pending, user } = useAuthVM();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = () => {
    if (file) registerStep3(file);
  };

  const handleSkip = () => {
    registerStep3(new File([], "skip"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold">Add a photo</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Help others recognise you (optional)
          </p>
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-border hover:border-primary transition-colors overflow-hidden"
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
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
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
            onClick={handleSkip}
            disabled={registerStep3Pending}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
