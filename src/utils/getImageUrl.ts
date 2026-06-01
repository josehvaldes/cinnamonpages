const S3_BASE_URL = import.meta.env.VITE_S3_BUCKET_URL;

export const getImageUrl = (imageKey: string) => {
    if (!imageKey) {
        return null; // or return a default image URL if you have one
    }
  return `${S3_BASE_URL}${imageKey}`;
};