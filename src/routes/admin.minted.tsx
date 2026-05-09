import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/minted")({
  component: Minted,
});

const data = Array.from({ length: 12 }, (_, i) => ({
  id: `VC-2024-00${(42 - i).toString().padStart(2, "0")}`,
  name: ["Adinda Putri", "Bayu Pratama", "Citra Lestari", "Dewi Anggraini", "Eka Wijaya", "Fahri Maulana"][i % 6],
  major: ["Computer Science", "Electrical Engineering", "Architecture", "Industrial Design"][i % 4],
  date: "2024-07-15",
  tx: "0x" + Math.random().toString(16).slice(2, 10) + "…" + Math.random().toString(16).slice(2, 6),
}));

function Minted() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minted Certificates</h1>
        <p className="text-sm text-muted-foreground">All certificates currently registered on the blockchain.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cert ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Tx Hash</TableHead>
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
                  <TableCell className="text-right"><Badge>Confirmed</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
