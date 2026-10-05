import { randomBytes } from "node:crypto";

const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz"; // no 0/1/i/l/o

/** Short, human-readable reference, e.g. "EM-7K2X9Q". */
export function referenceId(prefix = "EM", length = 6): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return `${prefix}-${out.toUpperCase()}`;
}
