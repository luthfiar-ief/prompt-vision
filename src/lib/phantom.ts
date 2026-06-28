// Helper integrasi Phantom Wallet (ekosistem Solana).
// Mendeteksi `window.solana` (provider Phantom) dan menyediakan
// fungsi koneksi/diskoneksi yang mengembalikan Public Key (Base58).

type PhantomProvider = {
  isPhantom?: boolean;
  publicKey?: { toString: () => string } | null;
  isConnected?: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on?: (event: string, cb: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
    phantom?: { solana?: PhantomProvider };
  }
}

export function getPhantomProvider(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  const p = window.phantom?.solana ?? window.solana;
  return p && p.isPhantom ? p : null;
}

export const PHANTOM_INSTALL_URL = "https://phantom.app/download";

export async function connectPhantom(): Promise<string> {
  const provider = getPhantomProvider();
  if (!provider) {
    throw new Error("PHANTOM_NOT_INSTALLED");
  }
  const res = await provider.connect();
  return res.publicKey.toString();
}

export async function disconnectPhantom(): Promise<void> {
  const provider = getPhantomProvider();
  if (provider) {
    try { await provider.disconnect(); } catch { /* noop */ }
  }
}
