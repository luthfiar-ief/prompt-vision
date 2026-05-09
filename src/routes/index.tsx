import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { PublicNav } from "@/components/public-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Upload, FileText, Shield, Database, Search, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VeriChain — Verifikasi Ijazah Kampus di Blockchain" },
      { name: "description", content: "Verifikasi keaslian sertifikat akademik yang diterbitkan kampus secara instan. Tercatat di blockchain, anti-pemalsuan." },
    ],
  }),
});

type Result = { status: "authentic" | "invalid"; data?: { name: string; nim: string; major: string; graduation: string; tx: string } } | null;

const MOCK_DB: Record<string, { name: string; nim: string; major: string; graduation: string; tx: string }> = {
  "VC-2024-0001": { name: "Fanny Rahma Dwiyanti", nim: "G.231.23.0126", major: "Teknik Informatika", graduation: "2024-07-15", tx: "0x9f2c…a41b" },
  "VC-2024-0042": { name: "Rizky Taufik Hidayat", nim: "G.231.23.0127", major: "Teknik Informatika", graduation: "2024-07-15", tx: "0x4ad1…7c0e" },
  "VC-2023-0117": { name: "Sarah Mawla", nim: "G.231.23.0152", major: "Teknik Informatika", graduation: "2023-12-09", tx: "0x18bc…ee92" },
};

function Index() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const [drag, setDrag] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const verify = (id: string) => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const found = MOCK_DB[id.trim().toUpperCase()];
      setResult(found ? { status: "authentic", data: found } : { status: "invalid" });
      setLoading(false);
    }, 900);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) {
      setFileName(f.name);
      const ids = Object.keys(MOCK_DB);
      const id = f.name.toLowerCase().includes("invalid") ? "VC-XXXX-FAKE" : ids[Math.floor(Math.random() * ids.length)];
      verify(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/40 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1 text-xs font-medium">
                <Shield className="h-3 w-3" /> Registri Aman Berbasis Blockchain
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Verifikasi ijazah dengan kepercayaan mutlak.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Portal resmi verifikasi sertifikat kampus. Setiap ijazah yang diterbitkan tercatat di blockchain — instan, tidak dapat diubah, dan dapat diverifikasi dari mana saja.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Database className="h-4 w-4 text-primary" /> 12.847 sertifikat tercatat</div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Uptime 99,9%</div>
              </div>
            </div>

            <Card className="border-border/80 shadow-xl shadow-primary/5">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Search className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">Verifikasi sertifikat</h2>
                    <p className="text-xs text-muted-foreground">Unggah PDF atau masukkan ID Sertifikat</p>
                  </div>
                </div>

                <Tabs defaultValue="id">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="id">Berdasarkan ID</TabsTrigger>
                    <TabsTrigger value="file">Unggah PDF</TabsTrigger>
                  </TabsList>
                  <TabsContent value="id" className="mt-4">
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => { e.preventDefault(); if (certId) verify(certId); }}
                    >
                      <Input
                        placeholder="contoh: VC-2024-0001"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        className="font-mono"
                      />
                      <Button type="submit" disabled={!certId || loading}>
                        {loading ? "Memeriksa…" : "Verifikasi"}
                      </Button>
                    </form>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Coba: <button type="button" onClick={() => { setCertId("VC-2024-0001"); verify("VC-2024-0001"); }} className="font-mono text-primary hover:underline">VC-2024-0001</button>
                    </p>
                  </TabsContent>
                  <TabsContent value="file" className="mt-4">
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={onDrop}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition ${drag ? "border-primary bg-primary/5" : "border-border bg-muted/30"}`}
                    >
                      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="text-sm font-medium">{fileName ?? "Letakkan berkas PDF sertifikat di sini"}</p>
                      <p className="text-xs text-muted-foreground">atau klik untuk memilih — PDF maks 10MB</p>
                    </div>
                  </TabsContent>
                </Tabs>

                {result && (
                  <div className="mt-5">
                    {result.status === "authentic" ? (
                      <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-semibold">Sertifikat Asli</span>
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                          <div><dt className="text-xs text-muted-foreground">Nama</dt><dd className="font-medium">{result.data!.name}</dd></div>
                          <div><dt className="text-xs text-muted-foreground">NIM</dt><dd className="font-mono">{result.data!.nim}</dd></div>
                          <div><dt className="text-xs text-muted-foreground">Program Studi</dt><dd>{result.data!.major}</dd></div>
                          <div><dt className="text-xs text-muted-foreground">Tanggal Lulus</dt><dd>{result.data!.graduation}</dd></div>
                          <div className="col-span-2"><dt className="text-xs text-muted-foreground">Transaksi</dt><dd className="font-mono text-xs text-primary">{result.data!.tx}</dd></div>
                        </dl>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="h-5 w-5" />
                          <span className="font-semibold">Tidak Ditemukan / Tidak Valid</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">Sertifikat ini tidak terdaftar di blockchain. Harap berhati-hati.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Cara kerja verifikasi</h2>
          <p className="mt-3 text-muted-foreground">Tiga langkah. Tanpa berkas fisik. Tanpa menelepon bagian akademik.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "Diterbitkan kampus", desc: "Setiap ijazah di-hash dan dicatat sebagai rekam jejak permanen." },
            { icon: FileText, title: "Kirim bukti Anda", desc: "Unggah PDF atau masukkan ID sertifikat yang tertera pada ijazah." },
            { icon: CheckCircle2, title: "Verifikasi instan", desc: "Sistem memeriksa rekam blockchain dan mengembalikan hasilnya." },
          ].map((s, i) => (
            <Card key={i} className="border-border/80">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div>© 2026 Registri Kampus VeriChain</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privasi</a>
            <a href="#" className="hover:text-foreground">Kontrak</a>
            <a href="#" className="hover:text-foreground">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
