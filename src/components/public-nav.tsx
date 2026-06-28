import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { VeriChainLogo } from "./verichain-logo";
import { findStudentByWallet } from "@/lib/mock-data";
import {
  connectPhantom,
  disconnectPhantom,
  getPhantomProvider,
  PHANTOM_INSTALL_URL,
} from "@/lib/phantom";

const WALLET_KEY = "verichain.wallet";

export function useConnectedWallet() {
  const [addr, setAddr] = useState<string | null>(null);
  useEffect(() => {
    setAddr(localStorage.getItem(WALLET_KEY));
    const onStorage = (e: StorageEvent) => {
      if (e.key === WALLET_KEY) setAddr(e.newValue);
    };
    const onCustom = () => setAddr(localStorage.getItem(WALLET_KEY));
    window.addEventListener("storage", onStorage);
    window.addEventListener("verichain:wallet", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("verichain:wallet", onCustom);
    };
  }, []);
  return addr;
}

export function setConnectedWallet(addr: string | null) {
  if (addr) localStorage.setItem(WALLET_KEY, addr);
  else localStorage.removeItem(WALLET_KEY);
  window.dispatchEvent(new Event("verichain:wallet"));
}

/**
 * Coba hubungkan Phantom Wallet asli (window.solana).
 * Mengembalikan Public Key Base58 bila sukses, atau null bila gagal.
 * Toast peringatan tampil otomatis bila Phantom belum terpasang.
 */
export async function connectPhantomWallet(): Promise<string | null> {
  if (!getPhantomProvider()) {
    toast.error("Phantom Wallet tidak terdeteksi", {
      description: "Silakan instal ekstensi Phantom Wallet di browser Anda terlebih dahulu.",
      action: {
        label: "Instal",
        onClick: () => window.open(PHANTOM_INSTALL_URL, "_blank", "noopener"),
      },
    });
    return null;
  }
  try {
    const pubkey = await connectPhantom();
    setConnectedWallet(pubkey);
    const student = findStudentByWallet(pubkey);
    if (student) {
      toast.success(`Selamat datang, ${student.name}`, {
        description: "Phantom Wallet terhubung ke akun mahasiswa Anda.",
      });
    } else {
      toast.success("Phantom Wallet terhubung", {
        description: `${pubkey.slice(0, 6)}…${pubkey.slice(-4)} • Akun ini belum terdaftar pada registri kampus.`,
      });
    }
    return pubkey;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Pengguna membatalkan koneksi";
    toast.error("Gagal menghubungkan Phantom", { description: msg });
    return null;
  }
}

export function ConnectWalletButton() {
  const addr = useConnectedWallet();
  const navigate = useNavigate();
  const route = useRouterState({ select: (r) => r.location.pathname });
  const [busy, setBusy] = useState(false);

  if (addr) {
    const student = findStudentByWallet(addr);
    const short = addr.slice(0, 4) + "…" + addr.slice(-4);
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link to="/dashboard">
            <Wallet className="h-4 w-4" />
            <span className="font-mono text-xs">{short}</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await disconnectPhantom();
            setConnectedWallet(null);
            toast.message(`Phantom ${student?.name ?? "pengguna"} diputus`);
            if (route.startsWith("/dashboard")) navigate({ to: "/" });
          }}
          aria-label="Putuskan Phantom Wallet"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const pk = await connectPhantomWallet();
        setBusy(false);
        if (pk && findStudentByWallet(pk)) navigate({ to: "/dashboard" });
      }}
    >
      <Wallet className="h-4 w-4" />
      {busy ? "Menghubungkan…" : "Hubungkan Phantom"}
    </Button>
  );
}

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary p-1.5 text-primary-foreground">
            <VeriChainLogo />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">VeriChain</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Registri Kampus · Solana</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">Verifikasi</Link>
          <Link to="/dashboard" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">Sertifikat Saya</Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">Tentang</Link>
          <Link to="/admin" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
