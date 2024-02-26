import path from "path";
import React, { useEffect, useState } from "react";
import { PDFViewer } from "./PDFViewer";
import { ImageViewer } from "./ImageViewer";

export const AssetViewport = ({
  asset,
  heroImage = undefined,
  fileData,
  setDragging,
  fullPath,
}) => {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(asset?.body?.type);
  }, [fileData]);

  return (
    <div
      className="h-full w-full"
      draggable
      onDrag={() => {
        setDragging(path.basename(fullPath));
      }}>
      {type?.includes("pdf") ? (
        <PDFViewer pdfData={fileData} />
      ) : (
        <ImageViewer imageData={fileData} contain />
      )}
    </div>
  );
};
