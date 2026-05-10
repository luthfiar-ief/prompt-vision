import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PublicNav } from "@/components/public-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Download, Share2, FileCheck2, GraduationCap, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: StudentDashboard,
  head: () => ({
    meta: [
      { title: "Dashboard Mahasiswa — VeriChain" },
      { name: "description", content: "Halaman pemilik sertifikat. Hubungkan dompet untuk melihat, mengunduh, dan membagikan sertifikat akademik Anda." },
    ],
  }),
});

type Cert = {
  id: string;
  name: string;
  nim: string;
  major: string;
  graduation: string;
  tx: string;
  ipfs: string;
};

const MOCK_OWNED: Cert[] = [
  {
    id: "VC-2024-0001",
    name: "Fanny Rahma Dwiyanti",
    nim: "G.231.23.0126",
    major: "Teknik Informatika",
    graduation: "2024-07-15",
    tx: "0x9f2c4ad1a3c8d72e91b4f88c0e2a41b",
    ipfs: "ipfs://bafybeigd...c8a",
  },
  {
    id: "VC-2024-0042",
    name: "Fanny Rahma Dwiyanti",
    nim: "G.231.23.0126",
    major: "Teknik Informatika — Sertifikat MBKM",
    graduation: "2024-02-20",
    tx: "0x4ad17c0e9f2caa11bc9c882ee92aa4",
    ipfs: "ipfs://bafybeih7...e29",
  },
];

function StudentDashboard() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connect = () => {
    setLoading(true);
    setTimeout(() => {
      const fake = "0x" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 6);
      setWallet(fake);
      setLoading(false);
      toast.success("Wallet terhubung", { description: fake });
    }, 700);
  };

  const disconnect = () => {
    setWallet(null);
    toast.message("Wallet diputus");
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/?cert=${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Tautan verifikasi disalin", { description: url });
  };

  const downloadPdf = (c: Cert) => {
    const blob = new Blob(
      [`Sertifikat VeriChain\n\nID: ${c.id}\nNama: ${c.name}\nNIM: ${c.nim}\nProgram: ${c.major}\nLulus: ${c.graduation}\nTx: ${c.tx}\n`],
      { type: "application/pdf" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${c.id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sertifikat diunduh");
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-3 gap-1.5">
              <GraduationCap className="h-3 w-3" /> Portal Mahasiswa
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sertifikat saya</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Hubungkan dompet Web3 Anda untuk melihat seluruh ijazah dan sertifikat yang diterbitkan kampus atas nama Anda.
            </p>
          </div>
          {wallet ? (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 font-mono text-xs">
                <Wallet className="h-3 w-3" /> {wallet}
              </Badge>
              <Button variant="ghost" size="sm" onClick={disconnect}>Putuskan</Button>
            </div>
          ) : null}
        </div>

        {!wallet ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Hubungkan dompet Anda</h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Sertifikat ditautkan ke alamat wallet yang didaftarkan saat penerbitan. Hubungkan untuk membuka koleksi Anda.
                </p>
              </div>
              <Button onClick={connect} disabled={loading} className="gap-2">
                <Wallet className="h-4 w-4" />
                {loading ? "Menghubungkan…" : "Hubungkan Wallet"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {MOCK_OWNED.map((c) => (
              <Card key={c.id} className="overflow-hidden border-border/80">
                <div className="flex items-center gap-3 border-b border-border/60 bg-muted/30 px-5 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <FileCheck2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{c.major}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{c.id}</div>
                  </div>
                  <Badge className="bg-success/15 text-success hover:bg-success/15">On-chain</Badge>
                </div>
                <CardContent className="p-5">
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div><dt className="text-xs text-muted-foreground">Nama</dt><dd className="font-medium">{c.name}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">NIM</dt><dd className="font-mono">{c.nim}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">Tanggal Lulus</dt><dd>{c.graduation}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">IPFS</dt><dd className="truncate font-mono text-xs text-primary">{c.ipfs}</dd></div>
                    <div className="col-span-2"><dt className="text-xs text-muted-foreground">Transaksi</dt><dd className="truncate font-mono text-xs text-primary">{c.tx}</dd></div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => downloadPdf(c)} className="gap-1.5">
                      <Download className="h-3.5 w-3.5" /> Unduh
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyLink(c.id)} className="gap-1.5">
                      <Share2 className="h-3.5 w-3.5" /> Salin tautan verifikasi
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="gap-1.5">
                      <Link to="/" search={{ cert: c.id } as never}>
                        <ExternalLink className="h-3.5 w-3.5" /> Lihat publik
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wallet && (
          <Card className="mt-6 border-border/60 bg-muted/20">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Copy className="h-4 w-4" />
                Tautan verifikasi dapat Anda kirim ke perekrut atau institusi mana pun untuk pengecekan instan.
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/">Buka portal verifikasi</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
