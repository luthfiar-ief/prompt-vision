import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/minted")({
  component: Minted,
});

const names = [
  "Fanny Rahma Dwiyanti", "Rizky Taufik Hidayat", "Rico Ronald Mahardhika", "Yusup Eskandar",
  "Radithya Bhadrika Rachman", "Muhammad Luthfi Arif", "Ibrahim", "Yon Ekky Wijayanto",
  "Vincentius Indra Putra Atmoko", "Faza Tegar Balintra", "Rizky Bagus Wibowo", "Nareswara Bayu Pratama",
];

const data = names.map((name, i) => ({
  id: `VC-2024-${(126 + i).toString().padStart(4, "0")}`,
  name,
  major: "Teknik Informatika",
  date: "2024-07-15",
  tx: "0x" + Math.random().toString(16).slice(2, 10) + "…" + Math.random().toString(16).slice(2, 6),
}));

function Minted() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sertifikat Terbit</h1>
        <p className="text-sm text-muted-foreground">Seluruh sertifikat yang telah tercatat di blockchain.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Sertifikat</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Program Studi</TableHead>
                <TableHead>Tanggal Terbit</TableHead>
                <TableHead>Hash Transaksi</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.major}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>
                    <a href="#" className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline">
                      {r.tx} <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-right"><Badge>Terkonfirmasi</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
