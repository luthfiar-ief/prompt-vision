import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { listCertificates, useChain } from "@/lib/chain-store";

export const Route = createFileRoute("/admin/minted")({
  component: Minted,
});

function Minted() {
  useChain();
  const data = listCertificates();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sertifikat Terbit</h1>
        <p className="text-sm text-muted-foreground">Seluruh sertifikat yang telah tercatat sebagai akun on-chain di jaringan Solana.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {data.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Belum ada sertifikat yang diterbitkan. Mulai dari menu <em>Terbitkan Sertifikat</em>.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Sertifikat</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Program Studi</TableHead>
                  <TableHead>Tanggal Lulus</TableHead>
                  <TableHead>Signature (Solana)</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">{r.major}</TableCell>
                    <TableCell className="text-muted-foreground">{r.graduation}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-primary">
                        {r.tx.slice(0, 14)}… <ExternalLink className="h-3 w-3" />
                      </span>
                    </TableCell>
                    <TableCell className="text-right"><Badge>Terkonfirmasi</Badge></TableCell>
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
