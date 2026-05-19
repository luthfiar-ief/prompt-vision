import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { listStudentsWithStatus, issueCertificate, useChain } from "@/lib/chain-store";

export const Route = createFileRoute("/admin/students")({
  component: Students,
});

function Students() {
  useChain();
  const [q, setQ] = useState("");
  const [busyNim, setBusyNim] = useState<string | null>(null);
  const students = listStudentsWithStatus();
  const filtered = students.filter((d) =>
    `${d.name} ${d.nim} ${d.wallet}`.toLowerCase().includes(q.toLowerCase())
  );

  const quickIssue = (nim: string, name: string) => {
    setBusyNim(nim);
    try {
      const cert = issueCertificate({
        nim,
        graduation: new Date().toISOString().slice(0, 10),
      });
      toast.success(`Sertifikat ${name} diterbitkan`, {
        description: `${cert.id} • ${cert.tx.slice(0, 18)}…`,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menerbitkan");
    } finally {
      setBusyNim(null);
    }
  };

  const copyWallet = (w: string) => {
    navigator.clipboard.writeText(w);
    toast.success("Alamat wallet disalin");
  };

  const total = students.length;
  const minted = students.filter((s) => s.status === "Terbit").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daftar Mahasiswa</h1>
          <p className="text-sm text-muted-foreground">
            Telusuri data wisudawan dan terbitkan sertifikat yang belum dikonfirmasi.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">{minted} / {total} sudah terbit</Badge>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama, NIM, atau alamat wallet"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Alamat Wallet</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.nim}>
                  <TableCell className="text-muted-foreground">{s.no}</TableCell>
                  <TableCell className="font-mono text-xs">{s.nim}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => copyWallet(s.wallet)}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                    >
                      {s.wallet}
                      <Copy className="h-3 w-3" />
                    </button>
                  </TableCell>
                  <TableCell>
                    {s.status === "Terbit" ? (
                      <Badge className="bg-success/15 text-success hover:bg-success/15">Terbit</Badge>
                    ) : (
                      <Badge variant="secondary">Menunggu</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {s.status === "Menunggu" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        disabled={busyNim === s.nim}
                        onClick={() => quickIssue(s.nim, s.name)}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        {busyNim === s.nim ? "Menerbitkan…" : "Terbitkan"}
                      </Button>
                    ) : (
                      <span className="font-mono text-[11px] text-muted-foreground">{s.certId}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-border p-3 text-xs text-muted-foreground">
            Menampilkan {filtered.length} dari {total} entri
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
