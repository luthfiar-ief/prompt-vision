import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/issue")({
  component: IssuePage,
});

function IssuePage() {
  const [form, setForm] = useState({ name: "", nim: "", major: "", graduation: "" });
  const [file, setFile] = useState<File | null>(null);
  const [minting, setMinting] = useState(false);
  const [tx, setTx] = useState<string | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const mint = () => {
    if (!form.name || !form.nim || !form.major || !form.graduation) {
      toast.error("Please fill all student fields");
      return;
    }
    if (!file) {
      toast.error("Upload the certificate PDF");
      return;
    }
    setMinting(true);
    setTimeout(() => {
      const hash = "0x" + Array.from({ length: 8 }, () => Math.random().toString(16).slice(2, 6)).join("");
      setTx(hash);
      setMinting(false);
      toast.success("Minted to blockchain", { description: hash.slice(0, 18) + "…" });
    }, 1600);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Issue Certificate</h1>
        <p className="text-sm text-muted-foreground">Add student data, upload the diploma PDF, then mint it to the blockchain.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Student details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={update("name")} placeholder="e.g. Adinda Putri" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nim">NIM</Label>
            <Input id="nim" value={form.nim} onChange={update("nim")} placeholder="20210101" className="font-mono" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="major">Major</Label>
            <Input id="major" value={form.major} onChange={update("major")} placeholder="Computer Science" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="grad">Graduation date</Label>
            <Input id="grad" type="date" value={form.graduation} onChange={update("graduation")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Certificate file</CardTitle></CardHeader>
        <CardContent>
          <label
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition hover:border-primary/50 hover:bg-primary/5"
          >
            <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            {file ? (
              <>
                <FileText className="mb-2 h-6 w-6 text-primary" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB — click to replace</p>
              </>
            ) : (
              <>
                <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">Upload diploma PDF</p>
                <p className="text-xs text-muted-foreground">PDF up to 10MB</p>
              </>
            )}
          </label>
        </CardContent>
      </Card>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
        {tx && (
          <div className="flex items-center gap-2 rounded-md border border-success/30 bg-success/5 px-3 py-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-mono text-xs">{tx.slice(0, 18)}…</span>
          </div>
        )}
        <Button size="lg" onClick={mint} disabled={minting} className="gap-2">
          <Sparkles className="h-4 w-4" />
          {minting ? "Minting…" : "Mint to Blockchain"}
        </Button>
      </div>
    </div>
  );
}
