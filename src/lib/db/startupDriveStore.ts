import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import type { StartupDriveSubmission } from "@/lib/startup-drive/types";

/**
 * Fully isolated storage for Startup Drive submissions.
 * Deliberately does NOT touch src/lib/db/store.ts or its DbData schema —
 * this feature is additive and must not affect existing product/category/brand/user data.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "startup-drive.json");
const TMP_DIR = path.join(os.tmpdir(), "override-r-db");
const TMP_DB_FILE = path.join(TMP_DIR, "startup-drive.json");

let memoryStore: StartupDriveSubmission[] | null = null;

function ensureLoaded(): StartupDriveSubmission[] {
  if (memoryStore) return memoryStore;

  try {
    if (fs.existsSync(DB_FILE)) {
      memoryStore = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      return memoryStore!;
    }
    if (fs.existsSync(TMP_DB_FILE)) {
      memoryStore = JSON.parse(fs.readFileSync(TMP_DB_FILE, "utf-8"));
      return memoryStore!;
    }
  } catch (error) {
    console.error("Error reading startup-drive submissions file:", error);
  }

  memoryStore = [];
  return memoryStore;
}

function persist(data: StartupDriveSubmission[]): void {
  memoryStore = data;

  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
    return;
  } catch {
    // Primary path read-only (e.g. Vercel serverless) — fall back to /tmp
  }

  try {
    if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });
    const tempFile = `${TMP_DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, TMP_DB_FILE);
  } catch (error) {
    console.warn("Could not persist startup-drive submissions to disk/tmp:", error);
  }
}

export const startupDriveStore = {
  getAllSubmissions(): StartupDriveSubmission[] {
    return [...ensureLoaded()].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  },

  createSubmission(input: Omit<StartupDriveSubmission, "id" | "submittedAt">): StartupDriveSubmission {
    const data = ensureLoaded();
    const submission: StartupDriveSubmission = {
      ...input,
      id: `sd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt: new Date().toISOString(),
    };
    data.push(submission);
    persist(data);
    return submission;
  },
};
