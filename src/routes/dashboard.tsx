import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav, useConnectedWallet, setConnectedWallet } from "@/components/public-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Download, Share2, FileCheck2, GraduationCap, ExternalLink, Copy, ScrollText } from "lucide-react";
import { toast } from "sonner";
import { getOwnedCertificatesByWallet } from "@/lib/certificate-service";
import { useChain } from "@/lib/chain-store";
import { findStudentByWallet, type Certificate, type CertificateDoc } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  component: StudentDashboard,
  head: () => ({
    meta: [
      { title: "Dashboard Mahasiswa — VeriChain" },
      { name: "description", content: "Halaman pemilik sertifikat. Hubungkan dompet untuk melihat, mengunduh, dan membagikan sertifikat akademik Anda." },
    ],
  }),
});

function StudentDashboard() {
  useChain();
  const wallet = useConnectedWallet();
  const student = wallet ? findStudentByWallet(wallet) : undefined;
  const certs = wallet ? getOwnedCertificatesByWallet(wallet) : [];

  const disconnect = () => {
    setConnectedWallet(null);
    toast.message("Wallet diputus");
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/?cert=${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Tautan verifikasi disalin", { description: url });
  };

  const downloadDoc = (doc: CertificateDoc | undefined, fallbackName: string) => {
    if (!doc?.dataUrl) {
      toast.error("Berkas belum tersedia");
      return;
    }
    const a = document.createElement("a");
    a.href = doc.dataUrl;
    a.download = doc.name || fallbackName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success(`${fallbackName} diunduh`);
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
              {student
                ? <>Selamat datang, <span className="font-semibold text-foreground">{student.name}</span> ({student.nim}).</>
                : "Hubungkan wallet kampus Anda untuk melihat sertifikat yang diterbitkan atas nama Anda."}
            </p>
          </div>
          {wallet && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 font-mono text-xs">
                <Wallet className="h-3 w-3" /> {wallet.slice(0, 6)}…{wallet.slice(-4)}
              </Badge>
              <Button variant="ghost" size="sm" onClick={disconnect}>Putuskan</Button>
            </div>
          )}
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
              <Button asChild className="gap-2">
                <Link to="/login">
                  <Wallet className="h-4 w-4" /> Hubungkan Wallet
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : certs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Belum ada sertifikat yang diterbitkan untuk wallet ini. Hubungi admin akademik
            untuk mengkonfirmasi proses penerbitan ijazah Anda.
          </div>
        ) : (
          <div className="space-y-8">
            {certs.map((c: Certificate) => (
              <div key={c.id} className="space-y-3">
                <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border/60 pb-2">
                  <div>
                    <h2 className="text-lg font-semibold">{c.major}</h2>
                    <p className="font-mono text-[11px] text-muted-foreground">{c.id} • Lulus {c.graduation}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => copyLink(c.id)} className="gap-1.5">
                      <Share2 className="h-3.5 w-3.5" /> Salin tautan verifikasi
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="gap-1.5">
                      <Link to="/">
                        <ExternalLink className="h-3.5 w-3.5" /> Lihat publik
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <DocCard
                    title="Ijazah"
                    icon={<FileCheck2 className="h-4 w-4" />}
                    doc={c.ijazah}
                    cert={c}
                    onDownload={() => downloadDoc(c.ijazah, `Ijazah-${c.id}.pdf`)}
                  />
                  <DocCard
                    title="Transkrip Nilai"
                    icon={<ScrollText className="h-4 w-4" />}
                    doc={c.transkrip}
                    cert={c}
                    onDownload={() => downloadDoc(c.transkrip, `Transkrip-${c.id}.pdf`)}
                  />
                </div>
              </div>
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

function DocCard({
  title, icon, doc, cert, onDownload,
}: {
  title: string;
  icon: React.ReactNode;
  doc: CertificateDoc | undefined;
  cert: Certificate;
  onDownload: () => void;
}) {
  return (
    <Card className="overflow-hidden border-border/80">
      <div className="flex items-center gap-3 border-b border-border/60 bg-muted/30 px-5 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{title}</div>
          <div className="truncate font-mono text-[11px] text-muted-foreground">
            {doc?.name ?? "Belum tersedia"}
          </div>
        </div>
        <Badge className="bg-success/15 text-success hover:bg-success/15">On-chain</Badge>
      </div>
      <CardContent className="p-5">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-xs text-muted-foreground">Nama</dt><dd className="font-medium">{cert.name}</dd></div>
          <div><dt className="text-xs text-muted-foreground">NIM</dt><dd className="font-mono">{cert.nim}</dd></div>
          <div className="col-span-2">
            <dt className="text-xs text-muted-foreground">Hash {title}</dt>
            <dd className="truncate font-mono text-xs text-primary">{doc?.hash ? doc.hash.slice(0, 32) + "…" : "—"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-muted-foreground">Transaksi</dt>
            <dd className="truncate font-mono text-xs text-primary">{cert.tx}</dd>
          </div>
        </dl>
        <div className="mt-5">
          <Button size="sm" onClick={onDownload} disabled={!doc?.dataUrl} className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Unduh {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
