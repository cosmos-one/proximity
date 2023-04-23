import React, { useEffect, useState } from "react";
import { ImageViewer } from "./ImageViewer";

export const Image = ({ file }) => {
  const [imageData, setImageData] = useState<Buffer>();

  useEffect(() => {
    setImageData(file.data);
  }, [file]);
  
  return (
    <div className="p-2 h-full w-full overflow-hidden opacity-90 border border-lightgreen rounded-md">
        <div></div>
      <div className="flex justify-center w-full h-full overflow-y-auto customScroll min-w-[300px] p-5">
        <ImageViewer imageData={imageData}/>
      </div>
    </div>
  );
};
