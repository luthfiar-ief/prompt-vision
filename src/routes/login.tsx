import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicNav, connectPhantomWallet, setConnectedWallet } from "@/components/public-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, ShieldCheck, KeyRound, ExternalLink } from "lucide-react";
import { findStudentByWallet, STUDENTS } from "@/lib/mock-data";
import { getPhantomProvider, PHANTOM_INSTALL_URL } from "@/lib/phantom";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Hubungkan Phantom Wallet — VeriChain" },
      { name: "description", content: "Masuk ke portal mahasiswa VeriChain dengan Phantom Wallet (ekosistem Solana)." },
    ],
  }),
});

function LoginPage() {
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const [phantomBusy, setPhantomBusy] = useState(false);
  const navigate = useNavigate();

  const connectManual = (raw: string) => {
    const value = raw.trim();
    if (!value) {
      toast.error("Public Key Solana wajib diisi");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const student = findStudentByWallet(value);
      if (!student) {
        setLoading(false);
        toast.error("Public Key tidak terdaftar", {
          description: "Pastikan Anda menggunakan alamat Solana yang diberikan kampus.",
        });
        return;
      }
      setConnectedWallet(student.wallet);
      toast.success(`Selamat datang, ${student.name}`);
      navigate({ to: "/dashboard" });
    }, 600);
  };

  const connectViaPhantom = async () => {
    setPhantomBusy(true);
    const pk = await connectPhantomWallet();
    setPhantomBusy(false);
    if (pk && findStudentByWallet(pk)) navigate({ to: "/dashboard" });
  };

  const phantomInstalled = typeof window !== "undefined" && !!getPhantomProvider();

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Akses Mahasiswa · Solana
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hubungkan Phantom Wallet Anda
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            Sertifikat dan ijazah Anda ditautkan ke <span className="font-medium text-foreground">Public Key Solana</span>
            {" "}yang didaftarkan kampus. Hubungkan Phantom untuk membuka portal{" "}
            <span className="font-medium text-foreground">Sertifikat Saya</span>.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary">1.</span> Pasang ekstensi <em>Phantom Wallet</em> dari toko ekstensi browser Anda.</li>
            <li className="flex gap-2"><span className="text-primary">2.</span> Klik <em>Hubungkan Phantom</em>, lalu setujui permintaan koneksi.</li>
            <li className="flex gap-2"><span className="text-primary">3.</span> Anda akan diarahkan ke dashboard sertifikat Solana Anda.</li>
          </ul>
          {!phantomInstalled && (
            <a
              href={PHANTOM_INSTALL_URL}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Unduh Phantom Wallet
            </a>
          )}
        </div>

        <Card className="border-border/80 shadow-xl shadow-primary/5">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <KeyRound className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Login / Hubungkan Phantom Wallet</h2>
                <p className="text-xs text-muted-foreground">Gunakan ekstensi Phantom atau tempel Public Key</p>
              </div>
            </div>

            <Button onClick={connectViaPhantom} disabled={phantomBusy} className="w-full gap-2">
              <Wallet className="h-4 w-4" />
              {phantomBusy ? "Menghubungkan…" : "Hubungkan Phantom Wallet"}
            </Button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-2 text-xs uppercase tracking-wider text-muted-foreground">atau manual</span></div>
            </div>

            <form
              className="space-y-3"
              onSubmit={(e) => { e.preventDefault(); connectManual(addr); }}
            >
              <label className="block text-xs font-medium text-muted-foreground">Public Key Solana</label>
              <Input
                placeholder="contoh: yaYk4aWrAx5BbgE7tFbcRaXwCiEPfJKk5Tzz5DGwtsNA"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                className="font-mono text-xs"
                autoComplete="off"
              />
              <Button type="submit" variant="outline" disabled={loading} className="w-full gap-2">
                <KeyRound className="h-4 w-4" />
                {loading ? "Memeriksa…" : "Masuk dengan Public Key"}
              </Button>
            </form>

            <details className="mt-5 rounded-md border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium text-foreground">
                Lihat daftar Public Key (simulasi)
              </summary>
              <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
                {STUDENTS.map((s) => (
                  <li key={s.nim} className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setAddr(s.wallet)}
                      className="truncate text-left font-mono text-[11px] text-primary hover:underline"
                    >
                      {s.wallet.slice(0, 16)}…{s.wallet.slice(-6)}
                    </button>
                    <span className="truncate text-[10px]">{s.name}</span>
                  </li>
                ))}
              </ul>
            </details>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Bukan mahasiswa? <Link to="/" className="text-primary hover:underline">Kembali ke verifikasi publik</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
