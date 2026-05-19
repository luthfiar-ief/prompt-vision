// Lapisan tipis di atas chain-store. Komponen UI tetap memanggil
// fungsi-fungsi di file ini sehingga migrasi ke backend asli mudah.

import {
  getCertificateById,
  getCertificateByPdfHash,
  getCertificatesByWallet,
  hashFile,
  issueCertificate as chainIssue,
  listCertificates,
  type IssueInput,
} from "./chain-store";
import type { Certificate } from "./mock-data";

export type VerifyResult =
  | { status: "authentic"; data: Certificate; matchedBy: "id" | "pdf" }
  | { status: "invalid" };

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function verifyById(rawId: string): Promise<VerifyResult> {
  await delay(500);
  const found = getCertificateById(rawId);
  return found
    ? { status: "authentic", data: found, matchedBy: "id" }
    : { status: "invalid" };
}

export async function verifyByPdf(file: File): Promise<VerifyResult> {
  const hash = await hashFile(file);
  await delay(400);
  const found = getCertificateByPdfHash(hash);
  return found
    ? { status: "authentic", data: found, matchedBy: "pdf" }
    : { status: "invalid" };
}

export async function issueCertificate(input: IssueInput): Promise<Certificate> {
  await delay(900);
  return chainIssue(input);
}

export function getOwnedCertificatesByWallet(wallet: string): Certificate[] {
  return getCertificatesByWallet(wallet);
}

export function listMintedIds(): string[] {
  return listCertificates().map((c) => c.id);
}
