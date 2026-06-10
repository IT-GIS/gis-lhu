import QRCode from "qrcode";

const PUBLIC_APP_URL = "https://gislaboratorium.com";

export type VerificationView =
  | {
      state: "valid";
      title: string;
      description: string;
    }
  | {
      state: "revoked";
      title: string;
      description: string;
    }
  | {
      state: "invalid";
      title: string;
      description: string;
    };

export function buildVerificationUrl(token: string) {
  const appUrl = (process.env.APP_URL || PUBLIC_APP_URL).replace(/\/+$/, "");
  return `${appUrl}/verify/${token}`;
}

export async function buildVerificationQrCode(token: string) {
  return QRCode.toDataURL(buildVerificationUrl(token), {
    width: 280,
    margin: 1,
    color: {
      dark: "#0f172a",
      light: "#f8fafc",
    },
  });
}

export async function buildVerificationQrCodeBuffer(token: string) {
  return QRCode.toBuffer(buildVerificationUrl(token), {
    width: 640,
    margin: 2,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });
}

export function getVerificationView(input: {
  tokenExists: boolean;
  isActive: boolean;
}) {
  if (!input.tokenExists) {
    return {
      state: "invalid",
      title: "Token verifikasi tidak ditemukan",
      description:
        "Dokumen tidak dapat diverifikasi. Pastikan token atau QR yang digunakan berasal dari dokumen resmi.",
    } satisfies VerificationView;
  }

  if (!input.isActive) {
    return {
      state: "revoked",
      title: "Dokumen sudah tidak aktif",
      description:
        "Dokumen pernah terdaftar, tetapi token verifikasinya sudah dicabut atau dokumennya tidak aktif.",
    } satisfies VerificationView;
  }

  return {
    state: "valid",
    title: "Dokumen Laporan Hasil Uji Telah Terverifikasi",
    description:
      "Dokumen ini tercatat pada sistem verifikasi PT Global Inspeksi Sistem. Informasi yang ditampilkan dapat digunakan untuk memastikan keaslian dokumen dan kesesuaian data penerbitan.",
  } satisfies VerificationView;
}
