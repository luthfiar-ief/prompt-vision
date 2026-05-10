// Service layer — satu-satunya tempat yang berbicara ke "backend".
// Saat ini menggunakan MOCK_CERTIFICATES. Saat backend Cursor sudah
// jalan, ganti isi setiap fungsi dengan `fetch(${API_BASE_URL}/...)`.
//
// Komponen UI TIDAK perlu diubah ketika migrasi ke backend asli.

import { MOCK_CERTIFICATES, MOCK_OWNED_IDS, type Certificate } from "./mock-data";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export type VerifyResult =
  | { status: "authentic"; data: Certificate }
  | { status: "invalid" };

export type IssueInput = {
  name: string;
  nim: string;
  major: string;
  graduation: string;
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function verifyCertificate(rawId: string): Promise<VerifyResult> {
  const id = rawId.trim().toUpperCase();

  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/certificates/${encodeURIComponent(id)}`);
    if (res.status === 404) return { status: "invalid" };
    if (!res.ok) throw new Error(`Gagal memverifikasi (HTTP ${res.status})`);
    const data = (await res.json()) as Certificate;
    return { status: "authentic", data };
  }

  // Mock fallback
  await delay(700);
  const found = MOCK_CERTIFICATES[id];
  return found ? { status: "authentic", data: found } : { status: "invalid" };
}

export async function issueCertificate(input: IssueInput): Promise<{ tx: string; id: string }> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Gagal menerbitkan (HTTP ${res.status})`);
    return res.json();
  }

  await delay(1400);
  const tx =
    "0x" + Array.from({ length: 8 }, () => Math.random().toString(16).slice(2, 6)).join("");
  const id = "VC-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
  return { tx, id };
}

export async function getOwnedCertificates(): Promise<Certificate[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/me/certificates`);
    if (!res.ok) throw new Error(`Gagal memuat sertifikat (HTTP ${res.status})`);
    return res.json();
  }

  await delay(500);
  return MOCK_OWNED_IDS.map((id) => MOCK_CERTIFICATES[id]).filter(Boolean);
}

export function listMockIds(): string[] {
  // Hanya untuk tampilan "Coba: VC-2024-..." di halaman verifikasi.
  return Object.keys(MOCK_CERTIFICATES).filter((id) => !id.endsWith("-MBKM"));
}
