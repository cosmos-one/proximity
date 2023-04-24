import React, { useEffect, useState } from "react";
export const PDFViewer = ({ pdfData }) => {
  const [fileUrl, setFileUrl] = useState<string>(null);
  useEffect(() => {
    const fileUrl = URL.createObjectURL(
      new Blob([pdfData], { type: "application/pdf" })
    );
    setFileUrl(fileUrl);
  }, [pdfData]);
  return (
    <embed src={fileUrl} type="application/pdf" className="w-full h-full" />
  );
};
