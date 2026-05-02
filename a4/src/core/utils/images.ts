import { ORIGINAL_IMAGE_BASE_URL } from "../constants";
import { IMAGE_BASE_URL } from "../constants";

export const getBackdropUrl = (fileName: string) => `${ORIGINAL_IMAGE_BASE_URL}${fileName}`;

export const getImageUrl = (fileName: string) => `${IMAGE_BASE_URL}${fileName}`;
