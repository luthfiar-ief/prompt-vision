import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GraduationCap, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ConnectWalletButton() {
  const [addr, setAddr] = useState<string | null>(null);
  const connect = () => {
    const fake = "0x" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 6);
    setAddr(fake);
    toast.success("Wallet connected", { description: fake });
  };
  return (
    <Button variant="outline" size="sm" onClick={connect} className="gap-2">
      <Wallet className="h-4 w-4" />
      {addr ?? "Connect Wallet"}
    </Button>
  );
}

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">VeriChain</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">University Registry</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">Verify</Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">About</Link>
          <Link to="/admin" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
