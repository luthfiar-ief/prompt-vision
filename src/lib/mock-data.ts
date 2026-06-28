// Sumber kebenaran daftar mahasiswa + alamat wallet Solana (simulasi).
// Sertifikat TIDAK lagi disimpan di sini — dikelola oleh chain-store.

export type Student = {
  no: number;
  nim: string;
  name: string;
  sesi: string;
  wallet: string; // alamat wallet Solana (Base58)
  major: string;
};

export const STUDENTS: Student[] = [
  { no: 1,  nim: "G.231.23.0126", name: "Fanny Rahma Dwiyanti",          sesi: "Sore", wallet: "e2GDjgt6R2DW2CeYDbo1ohLAxL66rcojYyNZqcrah3EH", major: "Teknik Informatika" },
  { no: 2,  nim: "G.231.23.0127", name: "RIZKY TAUFIK HIDAYAT",          sesi: "Sore", wallet: "5E6HdNNDGwecAjAPzeZgqnE2KGDwsKfPvTGFZGauQDzW", major: "Teknik Informatika" },
  { no: 3,  nim: "G.231.23.0128", name: "RICO RONALD MAHARDHIKA",        sesi: "Sore", wallet: "637dnR4PzXyr1igYGe7STxsGWBusJec9mYnX1K2vsqJ4", major: "Teknik Informatika" },
  { no: 4,  nim: "G.231.23.0129", name: "Yusup Eskandar",                sesi: "Sore", wallet: "sw5V5mm8UYGsRDYjCKzeSX8ELbED5dEur5EfD8waUnoC", major: "Teknik Informatika" },
  { no: 5,  nim: "G.231.23.0130", name: "RADITHYA BHADRIKA RACHMAN",     sesi: "Sore", wallet: "6SRUjgz6QLrFCTRHFvSrY3zqyvrAVDQ4NzGnTRxzZi9J", major: "Teknik Informatika" },
  { no: 6,  nim: "G.231.23.0131", name: "Muhammad Luthfi Arif",          sesi: "Sore", wallet: "yaYk4aWrAx5BbgE7tFbcRaXwCiEPfJKk5Tzz5DGwtsNA", major: "Teknik Informatika" },
  { no: 7,  nim: "G.231.23.0134", name: "IBRAHIM",                       sesi: "Sore", wallet: "qhcze1pJfw877ZGciCdGVur6RH1mdGjYR15tuYqa98Ju", major: "Teknik Informatika" },
  { no: 8,  nim: "G.231.23.0140", name: "YON EKKY WIJAYANTO",            sesi: "Sore", wallet: "oruDF6ntQc9vsypt2jLvospGn7srDpTJoE2CLsyHeQyY", major: "Teknik Informatika" },
  { no: 9,  nim: "G.231.23.0141", name: "VINCENTIUS INDRA PUTRA ATMOKO", sesi: "Sore", wallet: "w7yBxG7SjKcWPaFi1vYikfN5fLKriJJQQJ8RwgucJY1H", major: "Teknik Informatika" },
  { no: 10, nim: "G.231.23.0142", name: "FAZA TEGAR BALINTRA",           sesi: "Sore", wallet: "RaeTSDUuoA5WdLpkgEC2FUr5RdChVFf1km7RBxX3FrTo", major: "Teknik Informatika" },
  { no: 11, nim: "G.231.23.0145", name: "RIZKY BAGUS WIBOWO",            sesi: "Sore", wallet: "fzbxtciWqYukUGFdmXdG5HGKY9Ehh4QYRCRuahrmP1Mk", major: "Teknik Informatika" },
  { no: 12, nim: "G.231.23.0148", name: "NARESWARA BAYU PRATAMA",        sesi: "Sore", wallet: "rxRkYbDDS2LgQAU8d2PZ2e8T3NDKmNkqF52YzMenekxC", major: "Teknik Informatika" },
  { no: 13, nim: "G.231.23.0152", name: "SARAH MAWLA",                   sesi: "Sore", wallet: "298fZDhmAck7px72KgxQi5hd6mrb8znMRNWLrp7xdqiS", major: "Teknik Informatika" },
  { no: 14, nim: "G.231.23.0161", name: "Muhammad Ryan Setyoko",         sesi: "Sore", wallet: "jxGoYVSjGrq6tFTcN2rBDoLthH1w5iVkheVn6DhJaUXR", major: "Teknik Informatika" },
  { no: 15, nim: "G.231.23.0168", name: "AURELIA ENO HAANIYAH",          sesi: "Sore", wallet: "kLhGF7C7YmBDVjyXH6CEB1XGyZh8sVsaUSB3wUpQ5d49", major: "Teknik Informatika" },
  { no: 16, nim: "G.231.23.0169", name: "NOVIA FITRIANY PUTRI",          sesi: "Sore", wallet: "ZJz7mcnEXTSrzJdcjwDDfAB51TbHEihTgvndfwRYeup5", major: "Teknik Informatika" },
  { no: 17, nim: "G.231.23.0170", name: "YUDISTIRA ARYA PRADIPA",        sesi: "Sore", wallet: "AJkaH8ghwWV53SKF6xqaxzfG3kUevBadV6MLfrLhHwpY", major: "Teknik Informatika" },
  { no: 18, nim: "G.231.23.0173", name: "ANWAR AFIFUDIN",                sesi: "Sore", wallet: "TKKyQWzfYQBMkdmCYvSh8ycEAYZ6zuT7qViWGqyFYPvW", major: "Teknik Informatika" },
  { no: 19, nim: "G.231.23.0175", name: "IVAN RASYIIDU DARELL DARJI",    sesi: "Sore", wallet: "tsHnRwWpHJbzV9YMZYTKBhaEm3khpPfpyV3WbssSXTiQ", major: "Teknik Informatika" },
  { no: 20, nim: "G.231.23.0177", name: "RATNASARI",                     sesi: "Sore", wallet: "e9UyLherrrPKims34dvzkS6dsShu3oJN9XZnA5scEu9T", major: "Teknik Informatika" },
];

export type CertificateDoc = {
  hash: string;
  name: string;
  dataUrl: string; // base64 data URL untuk simulasi unduh
};

export type Certificate = {
  id: string;
  nim: string;
  name: string;
  major: string;
  graduation: string;
  tx: string; // Signature transaksi Solana (simulasi)
  wallet: string; // Public Key Solana pemilik
  ijazah: CertificateDoc;
  transkrip: CertificateDoc;
  // alias untuk kompatibilitas hash verifikasi publik (cocokkan via PDF ijazah)
  pdfHash?: string;
  pdfName?: string;
  issuedAt: string;
};

// Catatan: alamat Solana bersifat case-sensitive (Base58), jadi perbandingan tidak di-lowercase.
export function findStudentByWallet(addr: string): Student | undefined {
  const a = addr.trim();
  return STUDENTS.find((s) => s.wallet === a);
}

export function findStudentByNim(nim: string): Student | undefined {
  const n = nim.trim().toUpperCase();
  return STUDENTS.find((s) => s.nim.toUpperCase() === n);
}
