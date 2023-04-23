import { useEffect, useState } from "react";

interface ImageViewerProps {
  imageData: Buffer;
}

export const ImageViewer = ({ imageData }: ImageViewerProps) => {
  return imageData && <img src={`data:image/png;base64,${imageData.toString('base64')}`} alt="Image" className="w-full h-full object-contain"/>;
};