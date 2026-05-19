import { cn } from "@/lib/utils";

type Props = { className?: string };

// Logo VeriChain — monogram "VC" di dalam segi-enam dengan simbol rantai
// blockchain (tiga node terhubung) di atas. Menggunakan currentColor agar
// otomatis mengikuti warna teks (primary-foreground di chip primary).
export function VeriChainLogo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      {/* Segi enam sebagai bingkai "blok" */}
      <path
        d="M16 2.5l11.7 6.75v13.5L16 29.5 4.3 22.75V9.25L16 2.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.45"
      />
      {/* Rantai blok kecil di sisi kiri-atas (3 node) */}
      <circle cx="9.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="13.2" cy="8.2" r="1.1" fill="currentColor" />
      <circle cx="16.9" cy="10" r="1.1" fill="currentColor" />
      <path
        d="M9.5 10 L13.2 8.2 L16.9 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Monogram VC */}
      <path
        d="M10 13.5 L14 22 L17 15"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 15.2c-.9-1-2.1-1.6-3.4-1.6-2.5 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4c1.3 0 2.5-.6 3.4-1.6"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
