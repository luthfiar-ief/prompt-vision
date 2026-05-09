import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/students")({
  component: Students,
});

const data = [
  { no: 1, nim: "G.231.23.0126", name: "Fanny Rahma Dwiyanti", sesi: "Sore" },
  { no: 2, nim: "G.231.23.0127", name: "RIZKY TAUFIK HIDAYAT", sesi: "Sore" },
  { no: 3, nim: "G.231.23.0128", name: "RICO RONALD MAHARDHIKA", sesi: "Sore" },
  { no: 4, nim: "G.231.23.0129", name: "Yusup Eskandar", sesi: "Sore" },
  { no: 5, nim: "G.231.23.0130", name: "RADITHYA BHADRIKA RACHMAN", sesi: "Sore" },
  { no: 6, nim: "G.231.23.0131", name: "Muhammad Luthfi Arif", sesi: "Sore" },
  { no: 7, nim: "G.231.23.0134", name: "IBRAHIM", sesi: "Sore" },
  { no: 8, nim: "G.231.23.0140", name: "YON EKKY WIJAYANTO", sesi: "Sore" },
  { no: 9, nim: "G.231.23.0141", name: "VINCENTIUS INDRA PUTRA ATMOKO", sesi: "Sore" },
  { no: 10, nim: "G.231.23.0142", name: "FAZA TEGAR BALINTRA", sesi: "Sore" },
  { no: 11, nim: "G.231.23.0145", name: "RIZKY BAGUS WIBOWO", sesi: "Sore" },
  { no: 12, nim: "G.231.23.0148", name: "NARESWARA BAYU PRATAMA", sesi: "Sore" },
  { no: 13, nim: "G.231.23.0152", name: "SARAH MAWLA", sesi: "Sore" },
  { no: 14, nim: "G.231.23.0161", name: "Muhammad Ryan Setyoko", sesi: "Sore" },
  { no: 15, nim: "G.231.23.0168", name: "AURELIA ENO HAANIYAH", sesi: "Sore" },
  { no: 16, nim: "G.231.23.0169", name: "NOVIA FITRIANY PUTRI", sesi: "Sore" },
  { no: 17, nim: "G.231.23.0170", name: "YUDISTIRA ARYA PRADIPA", sesi: "Sore" },
  { no: 18, nim: "G.231.23.0173", name: "ANWAR AFIFUDIN", sesi: "Sore" },
  { no: 19, nim: "G.231.23.0175", name: "IVAN RASYIIDU DARELL DARJI", sesi: "Sore" },
  { no: 20, nim: "G.231.23.0177", name: "RATNASARI", sesi: "Sore" },
];

function Students() {
  const [q, setQ] = useState("");
  const [minted, setMinted] = useState<Record<string, boolean>>({});
  const filtered = data.filter((d) => `${d.name} ${d.nim}`.toLowerCase().includes(q.toLowerCase()));

  const handleMint = (nim: string, name: string) => {
    setMinted((p) => ({ ...p, [nim]: true }));
    toast.success(`Sertifikat ${name} berhasil di-mint`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Daftar Mahasiswa</h1>
        <p className="text-sm text-muted-foreground">Telusuri data wisudawan dan terbitkan sertifikat yang belum di-mint.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama atau NIM"
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
                <TableHead>Sesi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => {
                const isMinted = minted[s.nim];
                return (
                  <TableRow key={s.nim}>
                    <TableCell className="text-muted-foreground">{s.no}</TableCell>
                    <TableCell className="font-mono text-xs">{s.nim}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.sesi}</TableCell>
                    <TableCell>
                      {isMinted ? <Badge>Terbit</Badge> : <Badge variant="secondary">Menunggu</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      {!isMinted && (
                        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleMint(s.nim, s.name)}>
                          <Sparkles className="h-3.5 w-3.5" /> Terbitkan
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="border-t border-border p-3 text-xs text-muted-foreground">
            Menampilkan {filtered.length} dari {data.length} entri
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
