/**
 * cloudinary.js — backward-compatibility shim.
 *
 * All logic has moved to CloudinaryService.js.
 * Existing imports (`from "../services/cloudinary"`) continue to work unchanged.
 */
export {
  uploadImageToCloudinary,
  uploadLogo,
  buildCloudinaryUrl,
  getPublicIdFromUrl,
  CLOUDINARY_CONFIG,
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_SIZE_MB,
} from "./CloudinaryService";
