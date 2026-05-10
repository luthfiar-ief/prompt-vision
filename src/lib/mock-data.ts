// Pusat data dummy untuk fase prototipe.
// Saat backend Cursor sudah siap, file ini bisa dihapus dan diganti
// dengan response API asli — komponen UI tidak perlu diubah karena
// hanya berinteraksi via `certificate-service.ts`.

export type Certificate = {
  id: string;
  name: string;
  nim: string;
  major: string;
  graduation: string; // ISO date
  tx: string; // tx hash on-chain (atau anchor hash di DB)
  ipfs?: string;
};

export const MOCK_CERTIFICATES: Record<string, Certificate> = {
  "VC-2024-0131": {
    id: "VC-2024-0131",
    name: "Muhammad Luthfi Arif",
    nim: "G.231.23.0131",
    major: "Teknik Informatika",
    graduation: "2024-07-15",
    tx: "0x9f2c4ad1a3c8d72e91b4f88c0e2a41b",
    ipfs: "ipfs://bafybeigd...c8a",
  },
  "VC-2024-0131-MBKM": {
    id: "VC-2024-0131-MBKM",
    name: "Muhammad Luthfi Arif",
    nim: "G.231.23.0131",
    major: "Teknik Informatika — Sertifikat MBKM",
    graduation: "2024-02-20",
    tx: "0x4ad17c0e9f2caa11bc9c882ee92aa4",
    ipfs: "ipfs://bafybeih7...e29",
  },
  "VC-2024-0129": {
    id: "VC-2024-0129",
    name: "Yusup Eskandar",
    nim: "G.231.23.0129",
    major: "Teknik Informatika",
    graduation: "2024-07-15",
    tx: "0x4ad17c0eaa31bc9982ee9244a17c0e",
  },
  "VC-2024-0170": {
    id: "VC-2024-0170",
    name: "Yudistira Arya Pradipa",
    nim: "G.231.23.0170",
    major: "Teknik Informatika",
    graduation: "2024-07-15",
    tx: "0x18bcaa31ee92aa44c0e9f2c4ad17c0",
  },
  "VC-2024-0173": {
    id: "VC-2024-0173",
    name: "Anwar Afifudin",
    nim: "G.231.23.0173",
    major: "Teknik Informatika",
    graduation: "2024-07-15",
    tx: "0x77de3b21ee92aa44c0e9f2c4ad17c0",
  },
  "VC-2024-0175": {
    id: "VC-2024-0175",
    name: "Ivan Rasyiidu Darell Darji",
    nim: "G.231.23.0175",
    major: "Teknik Informatika",
    graduation: "2024-07-15",
    tx: "0x52aa9f10ee92aa44c0e9f2c4ad17c0",
  },
};

// Sertifikat yang dimiliki user (mahasiswa) yang sedang login.
// Saat ini selalu Muhammad Luthfi Arif.
export const MOCK_OWNED_IDS = ["VC-2024-0131", "VC-2024-0131-MBKM"] as const;
