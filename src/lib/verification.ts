import QRCode from "qrcode";

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
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
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
        "Dokumen pernah dipublikasikan, tetapi token verifikasinya sudah dicabut atau dokumennya telah direvoke.",
    } satisfies VerificationView;
  }

  return {
    state: "valid",
    title: "Dokumen resmi berhasil diverifikasi",
    description:
      "Token aktif dan dokumen masih berstatus published. Informasi yang ditampilkan di bawah dapat digunakan untuk validasi keaslian.",
  } satisfies VerificationView;
}
