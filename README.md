# VeriChain — Verifikasi Ijazah Berbasis Blockchain

Portal verifikasi sertifikat akademik kampus. Setiap ijazah yang diterbitkan
dicatat di blockchain (atau di-anchor hash-nya di database) sehingga keasliannya
dapat diverifikasi siapa saja secara instan dan tidak dapat dipalsukan.

> Repositori ini berisi **frontend** (Lovable). Backend dan smart contract
> dibangun terpisah di repositori lain (Cursor).

## Tech Stack

- **Framework**: TanStack Start v1 + React 19 + Vite 7
- **Bahasa**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Routing**: TanStack Router (file-based)
- **Validasi**: Zod
- **Notifikasi**: Sonner

## Fitur

- 🔍 **Verifikasi publik** — masukkan ID sertifikat atau unggah PDF, sistem
  membandingkan dengan rekam blockchain.
- 🎓 **Dashboard mahasiswa** — lihat, unduh, dan bagikan tautan verifikasi
  sertifikat milik sendiri (terhubung via wallet).
- 🛡️ **Panel admin/registrar** — terbitkan sertifikat baru ke blockchain,
  kelola data mahasiswa, dan lihat riwayat penerbitan.

## Menjalankan secara lokal

```bash
# 1. Install dependency
bun install

# 2. Copy environment
cp .env.example .env

# 3. Jalankan dev server
bun run dev
```

Buka <http://localhost:8080>.

## Konfigurasi backend

Frontend ini berbicara ke backend hanya melalui satu file:
[`src/lib/certificate-service.ts`](src/lib/certificate-service.ts).

- Jika `VITE_API_BASE_URL` **kosong** → pakai data dummy (`src/lib/mock-data.ts`).
- Jika `VITE_API_BASE_URL` **terisi** → fetch ke backend asli.

Endpoint yang diharapkan dari backend Cursor:

| Method | Path                          | Deskripsi                            |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/certificates/:id`           | Verifikasi 1 sertifikat              |
| POST   | `/certificates`               | Terbitkan sertifikat baru (admin)    |
| GET    | `/me/certificates`            | List sertifikat milik user login     |

## Arsitektur Hybrid Blockchain

```
┌─────────────┐   verify/issue    ┌──────────────┐   anchor hash    ┌─────────────┐
│  Frontend   │ ───────────────→  │   Backend    │ ───────────────→ │  Database   │
│  (Lovable)  │ ←─── result ───── │   (Cursor)   │                  │ (Postgres)  │
└─────────────┘                   └──────┬───────┘                  └─────────────┘
                                         │ optional mint
                                         ▼
                                  ┌──────────────┐
                                  │   Testnet    │
                                  │ (Polygon/    │
                                  │  Sepolia)    │
                                  └──────────────┘
```

Setiap penerbitan menyimpan SHA-256 dari berkas PDF + metadata di database.
Opsional, hash yang sama di-mint sebagai event di smart contract testnet
sehingga rekam jejak permanen on-chain.

## Struktur folder

```
src/
├── routes/                # File-based routing (TanStack Start)
│   ├── index.tsx          # Halaman verifikasi publik
│   ├── dashboard.tsx      # Dashboard mahasiswa
│   ├── admin.tsx          # Layout admin
│   └── admin.*.tsx        # Halaman admin (issue, students, dst)
├── components/            # Komponen UI reusable
├── lib/
│   ├── mock-data.ts       # Data dummy
│   └── certificate-service.ts  # Layer API (mock ↔ backend asli)
└── styles.css             # Design tokens
```

## Status Pengembangan

- [x] UI verifikasi publik
- [x] Dashboard mahasiswa
- [x] Panel admin penerbitan
- [x] Service layer (mock)
- [ ] Backend (di-build di Cursor)
- [ ] Smart contract Solidity
- [ ] Integrasi wallet (MetaMask)

## Lisensi

Tugas Akhir — Universitas Semarang, 2025.
