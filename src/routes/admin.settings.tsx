import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">Konfigurasi registri, Program Solana, dan jaringan.</p>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Kampus</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Nama institusi</Label><Input defaultValue="Universitas Verifikasi" /></div>
          <div className="space-y-1.5"><Label>Email registri</Label><Input defaultValue="registrar@kampus.ac.id" /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Jaringan Solana</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Cluster</Label><Input defaultValue="Solana Devnet" /></div>
          <div className="space-y-1.5"><Label>Program ID (Anchor)</Label><Input defaultValue="VeriCh4inProgrAm1111111111111111111111111111" className="font-mono" /></div>
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <div className="text-sm font-medium">Terbitkan otomatis</div>
              <div className="text-xs text-muted-foreground">Terbitkan sertifikat segera setelah diunggah.</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end"><Button>Simpan perubahan</Button></div>
    </div>
  );
}
