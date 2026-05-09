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
  { nim: "20210101", name: "Adinda Putri Maharani", major: "Computer Science", graduation: "2024-07-15", minted: true },
  { nim: "20210420", name: "Bayu Pratama", major: "Electrical Engineering", graduation: "2024-07-15", minted: true },
  { nim: "20210512", name: "Reno Saputra", major: "Computer Science", graduation: "2024-07-14", minted: false },
  { nim: "20210618", name: "Dewi Anggraini", major: "Architecture", graduation: "2024-07-14", minted: true },
  { nim: "20210733", name: "Fahri Maulana", major: "Mechanical Engineering", graduation: "2024-07-15", minted: false },
  { nim: "20210801", name: "Gita Permata", major: "Industrial Design", graduation: "2024-07-15", minted: true },
];

function Students() {
  const [q, setQ] = useState("");
  const filtered = data.filter((d) => `${d.name} ${d.nim} ${d.major}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <p className="text-sm text-muted-foreground">Browse student records and mint pending certificates.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, NIM, or major" value={q} onChange={(e) => setQ(e.target.value)} className="border-0 shadow-none focus-visible:ring-0" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIM</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Graduation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.nim}>
                  <TableCell className="font-mono text-xs">{s.nim}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.major}</TableCell>
                  <TableCell className="text-muted-foreground">{s.graduation}</TableCell>
                  <TableCell>
                    {s.minted ? <Badge>Minted</Badge> : <Badge variant="secondary">Pending</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    {!s.minted && (
                      <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.success(`Minted ${s.name}`)}>
                        <Sparkles className="h-3.5 w-3.5" /> Mint
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
