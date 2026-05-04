import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, AlertCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: string[];
  message: string;
}

interface PreviewRow {
  name: string;
  type: string;
  cityCounty: string;
  email: string;
  specialization: string;
}

interface CsvImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

function parseCSVPreview(csv: string): { headers: string[]; rows: PreviewRow[]; total: number } {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { headers: [], rows: [], total: 0 };

  function parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    return fields;
  }

  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());

  function col(row: string[], name: string): string {
    const idx = headers.indexOf(name);
    return idx >= 0 ? (row[idx] ?? "").trim() : "";
  }

  const dataRows = lines.slice(1).filter((l) => l.trim());
  const rows: PreviewRow[] = dataRows.slice(0, 5).map((line) => {
    const row = parseCSVLine(line);
    return {
      name: col(row, "name"),
      type: col(row, "type"),
      cityCounty: col(row, "city/county"),
      email: col(row, "email"),
      specialization: col(row, "specialization"),
    };
  });

  return { headers, rows, total: dataRows.length };
}

export default function CsvImportDialog({ open, onOpenChange, onSuccess }: CsvImportDialogProps) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [csvText, setCsvText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<{ headers: string[]; rows: PreviewRow[]; total: number } | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const reset = () => {
    setCsvText(null);
    setFileName("");
    setPreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleClose = () => {
    if (!importing) {
      reset();
      onOpenChange(false);
    }
  };

  const loadFile = (file: File) => {
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      toast({ title: "Invalid file", description: "Please upload a .csv file", variant: "destructive" });
      return;
    }
    setFileName(file.name);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text);
      setPreview(parseCSVPreview(text));
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }, []);

  const handleImport = async () => {
    if (!csvText) return;
    setImporting(true);
    try {
      const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
      const resp = await fetch(`${apiBase}/api/admin/import-csv`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csvText }),
      });
      const data: ImportResult = await resp.json();
      if (!resp.ok) {
        toast({ title: "Import failed", description: (data as any).error || "Unknown error", variant: "destructive" });
        return;
      }
      setResult(data);
      if (data.imported > 0) {
        toast({ title: "Import complete", description: data.message });
        onSuccess();
      }
    } catch (err) {
      toast({ title: "Network error", description: "Could not reach the server", variant: "destructive" });
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Listings from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file with columns: Name, Type, City/County, Specialization, Certifications,
            Website, Email, Phone, Hourly Rate, Years Experience, Notes.
            All rows will be imported with status set to <strong>Published</strong>.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <>
            {!csvText ? (
              <div
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                  dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"
                }`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium">Drop your CSV file here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-1">Only .csv files are accepted</p>
                <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleFileChange} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{fileName}</p>
                    <p className="text-sm text-muted-foreground">{preview?.total ?? 0} rows detected</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={reset}>Change file</Button>
                </div>

                {preview && preview.rows.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Preview (first {preview.rows.length} of {preview.total} rows)</p>
                    <div className="rounded-md border overflow-x-auto text-sm">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left px-3 py-2 font-medium">Name</th>
                            <th className="text-left px-3 py-2 font-medium">Type</th>
                            <th className="text-left px-3 py-2 font-medium">City/County</th>
                            <th className="text-left px-3 py-2 font-medium">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {preview.rows.map((row, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-3 py-2 font-medium">{row.name || <span className="text-destructive">—</span>}</td>
                              <td className="px-3 py-2">
                                {row.type ? (
                                  <Badge variant="outline" className="text-xs">{row.type}</Badge>
                                ) : (
                                  <span className="text-muted-foreground text-xs">Individual</span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-muted-foreground">{row.cityCounty || "—"}</td>
                              <td className="px-3 py-2 text-muted-foreground truncate max-w-[160px]">{row.email || <span className="italic text-xs">auto-generated</span>}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {preview.total > 5 && (
                      <p className="text-xs text-muted-foreground mt-1">…and {preview.total - 5} more rows</p>
                    )}
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-amber-800">
                    This will create <strong>{preview?.total ?? 0} new listings</strong> with status <strong>Published</strong>.
                    Duplicate names will have a number appended to their slug.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose} disabled={importing}>Cancel</Button>
              <Button
                onClick={handleImport}
                disabled={!csvText || importing}
                className="min-w-[120px]"
              >
                {importing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Importing…</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Import {preview?.total ? `${preview.total} rows` : "CSV"}</>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className={`rounded-lg p-4 flex gap-3 ${result.imported > 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              {result.imported > 0 ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${result.imported > 0 ? "text-green-800" : "text-red-800"}`}>{result.message}</p>
                <div className="flex gap-4 mt-1 text-sm">
                  <span className="text-green-700">{result.imported} imported</span>
                  {result.skipped > 0 && <span className="text-amber-700">{result.skipped} skipped</span>}
                </div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Errors ({result.errors.length})</p>
                <div className="bg-muted rounded-md p-3 max-h-40 overflow-y-auto space-y-1">
                  {result.errors.map((e, i) => (
                    <p key={i} className="text-xs text-destructive">{e}</p>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
              {result.skipped > 0 && (
                <Button variant="outline" onClick={reset}>Import another file</Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
