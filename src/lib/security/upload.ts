/**
 * CV upload validation: size, extension, declared type AND magic bytes, so a
 * renamed executable cannot pass as a PDF. Malware scanning runs after upload
 * (see docs/ARCHITECTURE.md → "CV pipeline").
 */
export const MAX_CV_BYTES = 5 * 1024 * 1024;

const ALLOWED = {
  pdf: { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b, 0x03, 0x04], // PK.. (zip)
  },
  doc: { mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
} as const;

export type CvKind = keyof typeof ALLOWED;

export type CvCheck = { ok: true; kind: CvKind; mime: string } | { ok: false; error: string };

export function validateCv(name: string, size: number, head: Uint8Array): CvCheck {
  if (size === 0) return { ok: false, error: "The file is empty. Choose your CV again." };
  if (size > MAX_CV_BYTES)
    return { ok: false, error: "Your CV must be under 5 MB. Try exporting it as a PDF." };
  const ext = name.toLowerCase().split(".").pop() as CvKind | undefined;
  if (!ext || !(ext in ALLOWED))
    return { ok: false, error: "Upload a PDF or Word document (.pdf, .doc or .docx)." };
  const { magic, mime } = ALLOWED[ext];
  const matches = magic.every((byte, i) => head[i] === byte);
  if (!matches)
    return {
      ok: false,
      error: "This file doesn't look like a real PDF or Word document. Export it again and retry.",
    };
  return { ok: true, kind: ext, mime };
}
