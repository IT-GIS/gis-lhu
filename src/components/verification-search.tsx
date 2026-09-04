"use client";

import {
  Camera,
  CheckCircle2,
  LoaderCircle,
  Search,
  ScanLine,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type BarcodeDetectorInstance = {
  detect(source: ImageBitmapSource): Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorConstructor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorInstance;

declare global {
  interface Window {
    BarcodeDetector?: BarcodeDetectorConstructor;
  }
}

function tokenFromScan(value: string) {
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    const verifyIndex = parts.indexOf("verify");
    return verifyIndex >= 0 ? (parts[verifyIndex + 1] ?? value) : value;
  } catch {
    return value;
  }
}

export function VerificationSearch({
  language = "id",
}: {
  language?: "id" | "en";
}) {
  const isEnglish = language === "en";
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<number | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerMessage, setScannerMessage] = useState("");

  const stopScanner = () => {
    if (scanTimerRef.current) {
      window.clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsScanning(false);
  };

  useEffect(() => stopScanner, []);

  const search = async (searchValue = value) => {
    const normalizedValue = searchValue.trim();
    if (!normalizedValue) {
      setError(
        isEnglish
          ? "Enter an order number or LHU number first."
          : "Masukkan nomor order atau nomor LHU terlebih dahulu.",
      );
      return;
    }

    const verificationWindow = window.open("", "_blank");
    setIsSearching(true);
    setError("");

    try {
      const response = await fetch("/api/verify/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: normalizedValue }),
      });
      const result = (await response.json()) as {
        token?: string;
        message?: string;
      };

      if (!response.ok || !result.token) {
        throw new Error(
          isEnglish
            ? "The document was not found among published LHU records."
            : result.message || "Dokumen tidak ditemukan.",
        );
      }

      stopScanner();
      const verificationUrl = `/verify/${encodeURIComponent(result.token)}`;

      if (verificationWindow) {
        verificationWindow.location.href = verificationUrl;
      } else {
        window.location.assign(verificationUrl);
      }

      setValue("");
      setError("");
    } catch (searchError) {
      verificationWindow?.close();
      setError(
        searchError instanceof Error
          ? searchError.message
          : isEnglish
            ? "The search could not be processed."
            : "Pencarian gagal diproses.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const startScanner = async () => {
    setError("");
    setScannerMessage("");

    if (!window.BarcodeDetector) {
      setScannerMessage(
        isEnglish
          ? "This browser does not support automatic barcode scanning. Please enter the number manually."
          : "Browser ini belum mendukung scan barcode otomatis. Silakan masukkan nomor secara manual.",
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setIsScanning(true);

      const detector = new window.BarcodeDetector({
        formats: ["qr_code", "code_128", "code_39", "ean_13", "upc_a"],
      });
      const video = videoRef.current;

      if (!video) {
        throw new Error("Video scanner belum siap.");
      }

      const scanFrame = async () => {
        if (!streamRef.current) return;

        if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
          const detected = await detector.detect(video);
          const scannedValue = detected[0]?.rawValue;
          if (scannedValue) {
            const searchValue = tokenFromScan(scannedValue);
            setValue(searchValue);
            stopScanner();
            await search(searchValue);
            return;
          }
        }

        scanTimerRef.current = window.setTimeout(scanFrame, 250);
      };

      video.srcObject = stream;
      await video.play();
      scanFrame();
    } catch {
      stopScanner();
      setScannerMessage(
        isEnglish
          ? "The camera could not be accessed. Allow camera access or enter the number manually."
          : "Kamera tidak dapat diakses. Izinkan akses kamera atau masukkan nomor secara manual.",
      );
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          search();
        }}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-sky-100 p-2.5 text-sky-700">
            <Search className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-950">
              {isEnglish ? "Find a document" : "Cari dokumen"}
            </h2>
            <p className="text-sm text-slate-500">
              {isEnglish
                ? "Use one of the numbers printed on the LHU."
                : "Gunakan salah satu nomor yang tercetak pada LHU."}
            </p>
          </div>
        </div>
        <label
          className="mt-6 block text-sm font-bold text-slate-700"
          htmlFor="verification-value"
        >
          {isEnglish
            ? "Order number or LHU number"
            : "Nomor order atau nomor LHU"}
        </label>
        <input
          id="verification-value"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            isEnglish
              ? "Example: GIS2701HOF0007 or LP/J-0034D/26"
              : "Contoh: GIS2701HOF0007 atau LP/J-0034D/26"
          }
          className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 font-mono text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          autoComplete="off"
        />
        {error ? (
          <p className="mt-3 text-sm font-semibold text-rose-600">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={isSearching}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 font-bold text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-70"
        >
          {isSearching ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-5 w-5" />
          )}
          {isEnglish ? "Verify document" : "Verifikasi dokumen"}
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-7">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-white/10 p-2.5 text-sky-300">
            <ScanLine className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">
              {isEnglish ? "Scan barcode" : "Scan barcode"}
            </h2>
            <p className="text-sm text-slate-300">
              {isEnglish
                ? "Point your camera at the LHU QR code or barcode."
                : "Arahkan kamera ke QR atau barcode LHU."}
            </p>
          </div>
        </div>
        {isScanning ? (
          <div className="relative mt-5 overflow-hidden rounded-xl border border-white/15 bg-black">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              muted
              playsInline
            />
            <button
              type="button"
              onClick={stopScanner}
              className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 text-white"
              aria-label={isEnglish ? "Close scanner" : "Tutup scanner"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startScanner}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 font-bold text-sky-200 transition hover:bg-sky-400/20"
          >
            <Camera className="h-5 w-5" />
            {isEnglish ? "Open camera" : "Buka kamera"}
          </button>
        )}
        {scannerMessage ? (
          <p className="mt-3 text-sm leading-6 text-amber-200">
            {scannerMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
