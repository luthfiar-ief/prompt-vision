// "Blockchain" simulasi yang disimpan di localStorage agar konsisten
// antara halaman Admin (penerbit) dan halaman publik (Verifikasi & Sertifikat Saya).

import { useSyncExternalStore } from "react";
import {
  STUDENTS,
  findStudentByNim,
  type Certificate,
  type CertificateDoc,
  type Student,
} from "./mock-data";

const STORAGE_KEY = "verichain.chain.v2";

type ChainState = {
  certificates: Record<string, Certificate>;
};

const listeners = new Set<() => void>();
let state: ChainState = load();

function load(): ChainState {
  if (typeof window === "undefined") return { certificates: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { certificates: {} };
    return JSON.parse(raw) as ChainState;
  } catch {
    return { certificates: {} };
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Gagal menyimpan chain state (kemungkinan kuota localStorage penuh)", e);
  }
}

function emit() {
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      emit();
    }
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot(): ChainState {
  return { certificates: {} };
}

export function useChain() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ---- Helpers ----
export async function hashFile(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function fileToDoc(file: File): Promise<CertificateDoc> {
  const [hash, dataUrl] = await Promise.all([hashFile(file), fileToDataUrl(file)]);
  return { hash, name: file.name, dataUrl };
}

function shortTx(seed: string) {
  const base = seed + Date.now().toString(16);
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) | 0;
  const hex = Math.abs(h).toString(16).padStart(8, "0");
  return (
    "0x" +
    hex +
    Array.from({ length: 6 }, () => Math.random().toString(16).slice(2, 6)).join("")
  );
}

function makeCertId(nim: string, year: number) {
  const last = nim.replace(/[^0-9]/g, "").slice(-4) || "0000";
  return `VC-${year}-${last}`;
}

// ---- Read API ----
export function listCertificates(): Certificate[] {
  return Object.values(state.certificates).sort((a, b) =>
    b.issuedAt.localeCompare(a.issuedAt)
  );
}

export function getCertificateById(id: string): Certificate | undefined {
  return state.certificates[id.trim().toUpperCase()];
}

export function getCertificateByPdfHash(hash: string): Certificate | undefined {
  const h = hash.toLowerCase();
  return Object.values(state.certificates).find(
    (c) => c.ijazah?.hash === h || c.transkrip?.hash === h || c.pdfHash === h
  );
}

export function getCertificatesByWallet(wallet: string): Certificate[] {
  const w = wallet.trim().toLowerCase();
  return Object.values(state.certificates).filter(
    (c) => c.wallet.toLowerCase() === w
  );
}

export function getCertificateByNim(nim: string): Certificate | undefined {
  const n = nim.trim().toUpperCase();
  return Object.values(state.certificates).find((c) => c.nim.toUpperCase() === n);
}

export function hasCertificateForNim(nim: string): boolean {
  return !!getCertificateByNim(nim);
}

export type StudentWithStatus = Student & {
  status: "Terbit" | "Menunggu";
  certId?: string;
};

export function listStudentsWithStatus(): StudentWithStatus[] {
  const byNim = new Map<string, Certificate>();
  for (const c of Object.values(state.certificates)) byNim.set(c.nim, c);
  return STUDENTS.map((s) => {
    const c = byNim.get(s.nim);
    return c
      ? { ...s, status: "Terbit" as const, certId: c.id }
      : { ...s, status: "Menunggu" as const };
  });
}

// ---- Write API ----
export type IssueInput = {
  nim: string;
  major?: string;
  graduation: string;
  ijazah: CertificateDoc;
  transkrip: CertificateDoc;
};

export function issueCertificate(input: IssueInput): Certificate {
  const student = findStudentByNim(input.nim);
  if (!student) {
    throw new Error(`NIM ${input.nim} tidak terdaftar di daftar mahasiswa kampus`);
  }
  const year = new Date(input.graduation || new Date()).getFullYear();
  const id = makeCertId(student.nim, year);
  const cert: Certificate = {
    id,
    nim: student.nim,
    name: student.name,
    major: input.major?.trim() || student.major,
    graduation: input.graduation,
    tx: shortTx(input.ijazah.hash),
    wallet: student.wallet,
    ijazah: input.ijazah,
    transkrip: input.transkrip,
    pdfHash: input.ijazah.hash,
    pdfName: input.ijazah.name,
    issuedAt: new Date().toISOString(),
  };
  state = {
    ...state,
    certificates: { ...state.certificates, [id]: cert },
  };
  persist();
  emit();
  return cert;
}
