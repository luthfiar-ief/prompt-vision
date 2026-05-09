import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Lock, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Tentang — Registri Kampus VeriChain" },
      { name: "description", content: "Mengapa kampus kami menerbitkan sertifikat berbasis blockchain dan bagaimana sistem verifikasi melindungi mahasiswa serta perusahaan." },
    ],
  }),
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Catatan tepercaya untuk setiap lulusan.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          VeriChain adalah registri sertifikat resmi kampus kami. Setiap ijazah dicatat ke blockchain publik agar dapat diverifikasi di mana saja — tanpa telepon, faks, atau lembaga perantara.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Shield, t: "Anti-pemalsuan", d: "Data tidak dapat diubah setelah diterbitkan." },
            { icon: Database, t: "Registri permanen", d: "Tersimpan di blockchain, lepas dari server kami." },
            { icon: Lock, t: "Menjaga privasi", d: "Hanya hash yang publik; data pribadi tetap di kampus." },
            { icon: Globe, t: "Verifikasi global", d: "Perusahaan di mana pun dapat memverifikasi dalam hitungan detik." },
          ].map((f, i) => (
            <Card key={i} className="border-border/80">
              <CardContent className="p-6">
                <f.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
