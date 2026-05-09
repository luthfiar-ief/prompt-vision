import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Lock, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — VeriChain University Registry" },
      { name: "description", content: "Why our university issues blockchain-backed certificates and how the verification system protects students and employers." },
    ],
  }),
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">A trusted record for every graduate.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          VeriChain is the official certificate registry of our university. We mint every diploma to a public blockchain so credentials can be verified anywhere in the world — without phone calls, fax machines, or third-party clearinghouses.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Shield, t: "Tamper-proof", d: "Records cannot be altered after issuance." },
            { icon: Database, t: "Permanent registry", d: "Stored on-chain, independent of our servers." },
            { icon: Lock, t: "Privacy-preserving", d: "Only hashes are public; PII stays with the university." },
            { icon: Globe, t: "Globally verifiable", d: "Employers anywhere can verify in seconds." },
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
