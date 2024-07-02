import { Area } from 'react-easy-crop/types';

export const getCroppedImg = async (sourceImage: File, cropArea: Area, targetSize: number): Promise<File> => {
  const image = new Image();
  image.src = URL.createObjectURL(sourceImage);

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const scaleX = image.width / canvas.width;
  const scaleY = image.height / canvas.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to create canvas context');
  }

  canvas.width = targetSize;
  canvas.height = targetSize;

  ctx.drawImage(
    image,
    cropArea.x * scaleX,
    cropArea.y * scaleY,
    cropArea.width * scaleX,
    cropArea.height * scaleY,
    0,
    0,
    targetSize,
    targetSize,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create blob'));
        return;
      }
      resolve(new File([blob], sourceImage.name, { type: sourceImage.type }));
    }, sourceImage.type);
  });
};