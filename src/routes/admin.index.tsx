import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileCheck2, Clock, TrendingUp, Upload } from "lucide-react";
import { listCertificates, listStudentsWithStatus, useChain } from "@/lib/chain-store";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  useChain();
  const students = listStudentsWithStatus();
  const certs = listCertificates();
  const waiting = students.filter((s) => s.status === "Menunggu").length;

  const stats = [
    { label: "Total Mahasiswa", value: String(students.length), icon: Users, delta: "Dataset wisudawan aktif" },
    { label: "Sertifikat Terbit", value: String(certs.length), icon: FileCheck2, delta: "Tercatat di blockchain" },
    { label: "Menunggu Penerbitan", value: String(waiting), icon: Clock, delta: "Belum dikonfirmasi admin" },
    { label: "Verifikasi (simulasi)", value: String(certs.length * 17 || 0), icon: TrendingUp, delta: "Estimasi 30 hari" },
  ];

  const recent = certs.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ringkasan Registri</h1>
          <p className="text-sm text-muted-foreground">Kelola dan terbitkan sertifikat mahasiswa.</p>
        </div>
        <Button asChild className="gap-2"><Link to="/admin/issue"><Upload className="h-4 w-4" /> Terbitkan Sertifikat</Link></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-2xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.delta}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Penerbitan terbaru</CardTitle>
          <Button variant="ghost" size="sm" asChild><Link to="/admin/minted">Lihat semua</Link></Button>
        </CardHeader>
        <CardContent className="px-0">
          {recent.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Belum ada penerbitan. Mulai dari menu <em>Terbitkan Sertifikat</em>.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Sertifikat</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Program Studi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">{r.major}</TableCell>
                    <TableCell className="text-muted-foreground">{r.graduation}</TableCell>
                    <TableCell className="text-right"><Badge>Terbit</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
