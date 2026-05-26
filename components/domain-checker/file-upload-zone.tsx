"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

const FileUploadZone = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <div
        className="w-full h-72 border border-dashed border-scootopia-gray-80 rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.csv"
          className="hidden"
        />
        <p className="text-sm text-center">
          <span className="text-primary">Click to upload</span> or drag and
          drop. .xlsx files only.
        </p>
        <p className="text-xs text-muted-foreground">
          URLs read from first sheet.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          0 URLs detected
        </span>
        <Button
          className="cursor-pointer uppercase tracking-wide rounded-md"
          variant="default"
        >
          Upload File
        </Button>
      </div>
    </div>
  );
};

export default FileUploadZone;
