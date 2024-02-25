import { useEffect, useState } from "react";

interface ImageViewerProps {
  imageData: Buffer;
  contain?: boolean;
}

export const ImageViewer = ({
  imageData,
  contain = false,
}: ImageViewerProps) => {
  return (
    imageData && (
      <img
        src={`data:image/png;base64,${imageData.toString("base64")}`}
        alt="Image"
        className={`w-full h-full ${
          contain ? "object-contain" : "object-cover"
        }`}
      />
    )
  );
};
