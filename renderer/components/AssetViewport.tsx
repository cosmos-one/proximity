import React, { useEffect, useState } from "react";
import { PDFViewer } from "./PDFViewer";
import { ImageViewer } from "./ImageViewer";

export const AssetViewport = ({ asset, heroImage=undefined, fileData }) => {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(asset?.body?.type);
  }, [fileData]);

  return (
    <div className="h-full w-full">
      {type?.includes("pdf") ? <PDFViewer pdfData={fileData} /> :  <ImageViewer imageData={heroImage} />}
    </div>
  );
};
