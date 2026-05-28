"use client";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseUrls } from "@/lib/domain-parser";
import { useDomainChecker } from "@/hooks/use-domain-checker";
import { useDomainCheckerStore } from "@/store/domain-checker";

const FileUploadZone = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const { run } = useDomainChecker();
  const isLoading = useDomainCheckerStore((s) => s.isLoading);
  const results = useDomainCheckerStore((s) => s.results);

  const urls = parseUrls(text);
  const hasFile = text.length > 0;

  const parseFile = async (file: File) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(firstSheet, { header: 1 });
    const parsed = rows
      .map((row) => String((row as unknown[])[0] ?? ""))
      .join("\n");
    setText(parsed);
  };

  const handleFile = (file: File | undefined) => {
    if (file) parseFile(file);
  };

  const exportCsv = () => {
    const rows = [
      ["URL", "Status", "Category"],
      ...results.map((r) => [r.url, String(r.status ?? "ERR"), r.category]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "domain-check-results.csv";
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="space-y-2">
      {hasFile ? (
        <div className="relative">
          <Textarea
            className="w-full h-72 resize-none p-4 border border-scootopia-gray-80 bg-scootopia-gray-100 rounded-md focus-visible:border-scootopia-gray-80 focus-visible:ring-0 text-lg font-normal tracking-wide"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="absolute top-2 right-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setText("");
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <div
          className={`w-full h-72 border border-dashed rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            isDragOver
              ? "border-scootopia-accent bg-scootopia-gray-90"
              : "border-scootopia-gray-80"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          <p className="text-sm text-center">
            <span className="text-primary">Click to upload</span> or drag and
            drop.
          </p>
          <p className="text-xs text-muted-foreground">
            .xlsx or .csv — URLs read from first column.
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.csv"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {urls.length} URL{urls.length !== 1 ? "s" : ""} detected
        </span>
        <div className="flex gap-2">
          {results.length > 0 && (
            <Button
              className="cursor-pointer uppercase tracking-wide rounded-md"
              variant="outline"
              disabled={results.length === 0}
              onClick={exportCsv}
            >
              Export File
            </Button>
          )}
          <Button
            className="cursor-pointer uppercase tracking-wide rounded-md"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            Upload File
          </Button>
          <Button
            className="cursor-pointer uppercase tracking-wide rounded-md"
            variant="default"
            disabled={urls.length === 0 || isLoading}
            onClick={async () => {
              const ok = await run(urls);
              if (ok) {
                setText("");
                if (inputRef.current) inputRef.current.value = "";
              }
            }}
          >
            {isLoading ? "Running…" : "Run"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
