import React, { useEffect, useState } from "react";
import { PDFViewer } from "./PDFViewer";

export const AssetViewport = ({ asset, fileData }) => {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(asset?.body?.type);
  }, [asset, fileData]);
  return <div className="h-full w-full">{type?.includes("pdf") && <PDFViewer pdfData={fileData} />}</div>;
};
