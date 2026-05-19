import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { issueCertificate } from "@/lib/certificate-service";
import { hashFile } from "@/lib/chain-store";
import { findStudentByNim, STUDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/issue")({
  component: IssuePage,
});

const issueSchema = z.object({
  nim: z
    .string()
    .trim()
    .regex(/^[A-Z]\.\d{3}\.\d{2}\.\d{4}$/i, "Format NIM tidak valid (contoh: G.231.23.0131)"),
  major: z.string().trim().min(2, "Program studi wajib diisi").max(100),
  graduation: z.string().min(1, "Tanggal lulus wajib diisi"),
});

const MAX_PDF_BYTES = 10 * 1024 * 1024;

function IssuePage() {
  const [form, setForm] = useState({ nim: "", major: "Teknik Informatika", graduation: "" });
  const [file, setFile] = useState<File | null>(null);
  const [minting, setMinting] = useState(false);
  const [tx, setTx] = useState<string | null>(null);

  const student = findStudentByNim(form.nim);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const mint = async () => {
    const parsed = issueSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Data tidak valid");
      return;
    }
    if (!findStudentByNim(parsed.data.nim)) {
      toast.error("NIM tidak terdaftar di daftar mahasiswa kampus");
      return;
    }
    if (!file) { toast.error("Unggah berkas PDF sertifikat"); return; }
    if (file.type !== "application/pdf") { toast.error("Berkas harus berupa PDF"); return; }
    if (file.size > MAX_PDF_BYTES) { toast.error("Ukuran PDF melebihi 10MB"); return; }

    setMinting(true);
    try {
      const pdfHash = await hashFile(file);
      const cert = await issueCertificate({
        nim: parsed.data.nim,
        major: parsed.data.major,
        graduation: parsed.data.graduation,
        pdfHash,
        pdfName: file.name,
      });
      setTx(cert.tx);
      toast.success("Tercatat di blockchain", {
        description: `${cert.id} • ${cert.tx.slice(0, 18)}…`,
      });
    } catch (err) {
      toast.error("Gagal menerbitkan", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan",
      });
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Terbitkan Sertifikat</h1>
        <p className="text-sm text-muted-foreground">
          Pilih mahasiswa berdasarkan NIM, unggah PDF ijazah, lalu terbitkan ke blockchain. Hash PDF akan disimpan untuk verifikasi publik.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Data Mahasiswa</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="nim">NIM mahasiswa</Label>
            <Input
              id="nim"
              list="nim-list"
              value={form.nim}
              onChange={update("nim")}
              placeholder="G.231.23.0131"
              className="font-mono"
              maxLength={20}
            />
            <datalist id="nim-list">
              {STUDENTS.map((s) => (
                <option key={s.nim} value={s.nim}>{s.name}</option>
              ))}
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label>Nama (otomatis)</Label>
            <Input value={student?.name ?? ""} disabled placeholder="Pilih NIM terlebih dahulu" />
          </div>
          <div className="space-y-1.5">
            <Label>Alamat Wallet (otomatis)</Label>
            <Input value={student?.wallet ?? ""} disabled className="font-mono text-xs" placeholder="—" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="major">Program studi</Label>
            <Input id="major" value={form.major} onChange={update("major")} placeholder="Teknik Informatika" maxLength={100} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="grad">Tanggal lulus</Label>
            <Input id="grad" type="date" value={form.graduation} onChange={update("graduation")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Berkas Sertifikat</CardTitle></CardHeader>
        <CardContent>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition hover:border-primary/50 hover:bg-primary/5">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                if (f && f.size > MAX_PDF_BYTES) {
                  toast.error("Ukuran PDF melebihi 10MB");
                  return;
                }
                setFile(f);
              }}
            />
            {file ? (
              <>
                <FileText className="mb-2 h-6 w-6 text-primary" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB — klik untuk mengganti</p>
              </>
            ) : (
              <>
                <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">Unggah PDF ijazah</p>
                <p className="text-xs text-muted-foreground">PDF maksimal 10MB — akan di-hash SHA-256</p>
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
          {minting ? "Menerbitkan…" : "Terbitkan ke Blockchain"}
        </Button>
      </div>
    </div>
  );
}
