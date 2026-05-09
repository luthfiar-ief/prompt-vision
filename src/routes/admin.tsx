import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { ConnectWalletButton } from "@/components/public-nav";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [
      { title: "Admin — Registri VeriChain" },
      { name: "description", content: "Konsol staf kampus untuk menerbitkan dan mencatat sertifikat mahasiswa ke blockchain." },
    ],
  }),
});

function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Kembali ke situs publik</Link>
            <div className="ml-auto">
              <ConnectWalletButton />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
