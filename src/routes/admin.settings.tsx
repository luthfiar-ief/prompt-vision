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
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Registry, contract, and network configuration.</p>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">University</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Institution name</Label><Input defaultValue="Universitas Verifikasi" /></div>
          <div className="space-y-1.5"><Label>Registry email</Label><Input defaultValue="registrar@uni.edu" /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Blockchain</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Network</Label><Input defaultValue="Polygon Mainnet" /></div>
          <div className="space-y-1.5"><Label>Contract address</Label><Input defaultValue="0xA1b2C3d4E5F6…" className="font-mono" /></div>
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <div className="text-sm font-medium">Auto-mint on issue</div>
              <div className="text-xs text-muted-foreground">Mint certificates immediately after upload.</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end"><Button>Save changes</Button></div>
    </div>
  );
}
