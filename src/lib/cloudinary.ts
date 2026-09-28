/**
 * Server-side Cloudinary utility — NEVER import this in client components.
 *
 * Centralises all Cloudinary operations:
 *   upload · delete · replace · URL generation · validation
 *
 * Environment variables consumed (all server-only):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_SECRET_KEY
 */

import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// ---------------------------------------------------------------------------
// Configuration (runs once on first import)
// ---------------------------------------------------------------------------

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

let _configured = false;

function ensureConfigured(): void {
  if (_configured) return;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary configuration incomplete — ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_SECRET_KEY are set in .env"
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  _configured = true;
}

/**
 * Check whether all Cloudinary environment variables are present.
 * NEVER returns the actual values — only a boolean.
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

// ---------------------------------------------------------------------------
// Folder constants
// ---------------------------------------------------------------------------

export const CLOUDINARY_FOLDERS = {
  products: "override-r/products",
  systems: "override-r/systems",
  services: "override-r/services",
  knowledgebase: "override-r/knowledgebase",
  hero: "override-r/hero",
  branding: "override-r/branding",
  gallery: "override-r/gallery",
} as const;

export type CloudinaryFolder = (typeof CLOUDINARY_FOLDERS)[keyof typeof CLOUDINARY_FOLDERS];

// ---------------------------------------------------------------------------
// File validation
// ---------------------------------------------------------------------------

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
]);

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

/** Maximum file size in bytes (10 MB). */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an uploaded file server-side before sending to Cloudinary.
 */
export function validateImageFile(
  file: File | { name: string; size: number; type: string }
): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size (${(file.size / 1024 / 1024).toFixed(1)} MB) exceeds the 10 MB limit.`,
    };
  }

  if (file.size === 0) {
    return { valid: false, error: "File is empty." };
  }

  // Check extension
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `File extension ".${ext}" is not allowed. Accepted: JPG, JPEG, PNG, WEBP.`,
    };
  }

  // Check MIME type (not fully trusted but a useful first gate)
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      valid: false,
      error: `MIME type "${file.type}" is not allowed. Accepted: image/jpeg, image/png, image/webp.`,
    };
  }

  return { valid: true };
}

// ---------------------------------------------------------------------------
// Upload result type
// ---------------------------------------------------------------------------

export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  originalFilename: string;
  resourceType: string;
  bytes: number;
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

/**
 * Upload a file buffer to Cloudinary.
 *
 * @param buffer     - Raw file bytes
 * @param folder     - Target Cloudinary folder (use CLOUDINARY_FOLDERS constants)
 * @param publicId   - Optional specific public ID (without folder prefix)
 * @param filename   - Original filename for metadata
 */
export async function uploadImage(
  buffer: Buffer,
  folder: string,
  filename: string,
  publicId?: string
): Promise<CloudinaryUploadResult> {
  ensureConfigured();

  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type: "image",
      overwrite: true,
      invalidate: true,
      // Let Cloudinary auto-detect and validate the format
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          reject(
            new Error(
              `Cloudinary upload failed: ${error?.message || "No result returned"}`
            )
          );
          return;
        }

        resolve({
          publicId: result.public_id,
          secureUrl: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          originalFilename: filename,
          resourceType: result.resource_type,
          bytes: result.bytes,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

/**
 * Delete a Cloudinary asset by its public ID.
 * Returns true if the asset was destroyed, false otherwise.
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  ensureConfigured();

  // Safety: only allow deletion within the override-r folder tree
  if (!publicId.startsWith("override-r/")) {
    throw new Error("Refusing to delete asset outside override-r/ folder.");
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
    return result.result === "ok";
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Replace (upload-first, delete-old pattern)
// ---------------------------------------------------------------------------

/**
 * Safely replace an image.
 *
 * 1. Upload the new image.
 * 2. Only after success, delete the old one.
 *
 * If the new upload fails, the old image is preserved.
 */
export async function replaceImage(
  oldPublicId: string | null | undefined,
  newBuffer: Buffer,
  folder: string,
  filename: string
): Promise<CloudinaryUploadResult> {
  // Step 1: upload new
  const newResult = await uploadImage(newBuffer, folder, filename);

  // Step 2: clean up old (only if different and exists)
  if (oldPublicId && oldPublicId !== newResult.publicId) {
    try {
      await deleteImage(oldPublicId);
    } catch {
      // Log silently — the old asset is orphaned but the new one is safe
      // In production this could push to a cleanup queue
    }
  }

  return newResult;
}

// ---------------------------------------------------------------------------
// URL generation with transformations
// ---------------------------------------------------------------------------

export interface ImageTransform {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
  format?: string;
  gravity?: string;
}

/**
 * Generate an optimised Cloudinary URL for a given public ID.
 */
export function getImageUrl(
  publicId: string,
  transforms?: ImageTransform
): string {
  ensureConfigured();

  const options: Record<string, unknown> = {
    secure: true,
  };

  if (transforms) {
    if (transforms.width) options.width = transforms.width;
    if (transforms.height) options.height = transforms.height;
    if (transforms.crop) options.crop = transforms.crop;
    if (transforms.quality) options.quality = transforms.quality;
    if (transforms.format) options.fetch_format = transforms.format;
    if (transforms.gravity) options.gravity = transforms.gravity;
  } else {
    // Sensible defaults: auto quality, auto format
    options.quality = "auto";
    options.fetch_format = "auto";
  }

  return cloudinary.url(publicId, options);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Check whether a URL is a Cloudinary URL (vs a local path).
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes("res.cloudinary.com");
}

/**
 * Build a product-specific folder path.
 */
export function getProductFolder(productSlug: string): string {
  return `${CLOUDINARY_FOLDERS.products}/${productSlug}`;
}

/**
 * Check if a public ID is used by any product in the database.
 * Import the db lazily to avoid circular dependencies.
 */
export async function isPublicIdInUse(publicId: string): Promise<boolean> {
  // Dynamic import to avoid circular dependency with db/store
  const { db } = await import("@/lib/db/store");
  const allProducts = db.getProducts();

  for (const product of allProducts) {
    // Check imageDetails
    if (product.imageDetails) {
      for (const img of product.imageDetails) {
        if (img.cloudinaryPublicId === publicId) return true;
      }
    }

    // Check images array for cloudinary URLs containing the publicId
    if (product.images) {
      for (const imgUrl of product.images) {
        if (isCloudinaryUrl(imgUrl) && imgUrl.includes(publicId)) return true;
      }
    }
  }

  return false;
}
