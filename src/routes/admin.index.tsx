import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileCheck2, Clock, TrendingUp, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const stats = [
  { label: "Total Students", value: "2,847", icon: Users, delta: "+24 this month" },
  { label: "Certificates Minted", value: "12,847", icon: FileCheck2, delta: "+312 this month" },
  { label: "Pending Issuance", value: "47", icon: Clock, delta: "Across 3 batches" },
  { label: "Verifications (30d)", value: "8,209", icon: TrendingUp, delta: "+18.4% vs prev." },
];

const recent = [
  { id: "VC-2024-0042", name: "Bayu Pratama", major: "Electrical Engineering", date: "2024-07-15", status: "Minted" },
  { id: "VC-2024-0041", name: "Ayu Kartika", major: "Industrial Design", date: "2024-07-15", status: "Minted" },
  { id: "VC-2024-0040", name: "Reno Saputra", major: "Computer Science", date: "2024-07-14", status: "Pending" },
  { id: "VC-2024-0039", name: "Dewi Anggraini", major: "Architecture", date: "2024-07-14", status: "Minted" },
];

function AdminOverview() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registry Overview</h1>
          <p className="text-sm text-muted-foreground">Issue, manage, and mint student certificates.</p>
        </div>
        <Button asChild className="gap-2"><Link to="/admin/issue"><Upload className="h-4 w-4" /> Issue Certificate</Link></Button>
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
          <CardTitle className="text-base">Recent issuances</CardTitle>
          <Button variant="ghost" size="sm" asChild><Link to="/admin/minted">View all</Link></Button>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.major}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={r.status === "Minted" ? "default" : "secondary"}>{r.status}</Badge>
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
