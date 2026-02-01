import fs from "node:fs/promises";
import path from "node:path";

export type LegalDocKey = "oferta" | "privacy" | "refunds";

const LEGAL_DIR = path.resolve(process.cwd(), "content", "legal");

export async function readLegalMarkdown(key: LegalDocKey): Promise<string> {
  const filePath = path.join(LEGAL_DIR, `${key}.md`);
  return await fs.readFile(filePath, "utf8");
}

