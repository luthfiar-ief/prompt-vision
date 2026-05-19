// Sumber kebenaran daftar mahasiswa + alamat wallet simulasi.
// Sertifikat TIDAK lagi disimpan di sini — dikelola oleh chain-store.

export type Student = {
  no: number;
  nim: string;
  name: string;
  sesi: string;
  wallet: string; // alamat wallet unik untuk login simulasi
  major: string;
};

export const STUDENTS: Student[] = [
  { no: 1,  nim: "G.231.23.0126", name: "Fanny Rahma Dwiyanti",          sesi: "Sore", wallet: "0x71C234FannyRahmaD0126", major: "Teknik Informatika" },
  { no: 2,  nim: "G.231.23.0127", name: "RIZKY TAUFIK HIDAYAT",          sesi: "Sore", wallet: "0x82D345RizkyTaufikH0127", major: "Teknik Informatika" },
  { no: 3,  nim: "G.231.23.0128", name: "RICO RONALD MAHARDHIKA",        sesi: "Sore", wallet: "0x93E456RicoRonaldM0128", major: "Teknik Informatika" },
  { no: 4,  nim: "G.231.23.0129", name: "Yusup Eskandar",                sesi: "Sore", wallet: "0x14A567YusupEskandar0129", major: "Teknik Informatika" },
  { no: 5,  nim: "G.231.23.0130", name: "RADITHYA BHADRIKA RACHMAN",     sesi: "Sore", wallet: "0x25B678RadithyaBhad0130", major: "Teknik Informatika" },
  { no: 6,  nim: "G.231.23.0131", name: "Muhammad Luthfi Arif",          sesi: "Sore", wallet: "0x36C789LuthfiArif0131",   major: "Teknik Informatika" },
  { no: 7,  nim: "G.231.23.0134", name: "IBRAHIM",                       sesi: "Sore", wallet: "0x47D890Ibrahim0134",      major: "Teknik Informatika" },
  { no: 8,  nim: "G.231.23.0140", name: "YON EKKY WIJAYANTO",            sesi: "Sore", wallet: "0x58E901YonEkkyW0140",     major: "Teknik Informatika" },
  { no: 9,  nim: "G.231.23.0141", name: "VINCENTIUS INDRA PUTRA ATMOKO", sesi: "Sore", wallet: "0x69F012VincentiusIP0141", major: "Teknik Informatika" },
  { no: 10, nim: "G.231.23.0142", name: "FAZA TEGAR BALINTRA",           sesi: "Sore", wallet: "0x70A123FazaTegarB0142",   major: "Teknik Informatika" },
  { no: 11, nim: "G.231.23.0145", name: "RIZKY BAGUS WIBOWO",            sesi: "Sore", wallet: "0x81B234RizkyBagusW0145",  major: "Teknik Informatika" },
  { no: 12, nim: "G.231.23.0148", name: "NARESWARA BAYU PRATAMA",        sesi: "Sore", wallet: "0x92C345NareswaraBayu0148",major: "Teknik Informatika" },
  { no: 13, nim: "G.231.23.0152", name: "SARAH MAWLA",                   sesi: "Sore", wallet: "0x03D456SarahMawla0152",   major: "Teknik Informatika" },
  { no: 14, nim: "G.231.23.0161", name: "Muhammad Ryan Setyoko",         sesi: "Sore", wallet: "0x14E567RyanSetyoko0161",  major: "Teknik Informatika" },
  { no: 15, nim: "G.231.23.0168", name: "AURELIA ENO HAANIYAH",          sesi: "Sore", wallet: "0x25F678AureliaEnoH0168",  major: "Teknik Informatika" },
  { no: 16, nim: "G.231.23.0169", name: "NOVIA FITRIANY PUTRI",          sesi: "Sore", wallet: "0x36G789NoviaFitriany0169",major: "Teknik Informatika" },
  { no: 17, nim: "G.231.23.0170", name: "YUDISTIRA ARYA PRADIPA",        sesi: "Sore", wallet: "0x47H890YudistiraArya0170",major: "Teknik Informatika" },
  { no: 18, nim: "G.231.23.0173", name: "ANWAR AFIFUDIN",                sesi: "Sore", wallet: "0x58I901AnwarAfifudin0173",major: "Teknik Informatika" },
  { no: 19, nim: "G.231.23.0175", name: "IVAN RASYIIDU DARELL DARJI",    sesi: "Sore", wallet: "0x69J012IvanRasyiidu0175", major: "Teknik Informatika" },
  { no: 20, nim: "G.231.23.0177", name: "RATNASARI",                     sesi: "Sore", wallet: "0x70K123Ratnasari0177",    major: "Teknik Informatika" },
];

export type Certificate = {
  id: string;
  nim: string;
  name: string;
  major: string;
  graduation: string;
  tx: string;
  wallet: string;
  pdfHash?: string;
  pdfName?: string;
  issuedAt: string;
};

export function findStudentByWallet(addr: string): Student | undefined {
  const a = addr.trim().toLowerCase();
  return STUDENTS.find((s) => s.wallet.toLowerCase() === a);
}

export function findStudentByNim(nim: string): Student | undefined {
  const n = nim.trim().toUpperCase();
  return STUDENTS.find((s) => s.nim.toUpperCase() === n);
}
