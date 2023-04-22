import { useEffect, useRef, useState, createElement, Fragment } from "react";
import { micromark } from "micromark";
import { ipcRenderer } from "electron";

interface ImagePreviewProps {
  file: { title: string; data: Buffer };
  index: number;
  dir: string;
}

export const ImagePreview = ({ file, index, dir }: ImagePreviewProps) => {
  const [imageData, setImageData] = useState<Buffer>();

  useEffect(() => {
    setImageData(file.data)
  }, [file])

  return (
    <div
      className="pt-6 h-full w-full overflow-scroll customScroll overflow-x-hidden opacity-90"
      tabIndex={0}>
      <div className="flex justify-center w-full min-w-[300px]">
        <div className="space-y-5 pr-4">
          {imageData && <img src={`data:image/png;base64,${imageData.toString('base64')}`} alt="Image" />}
        </div>
      </div>
    </div>
  );
};