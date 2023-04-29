import { useEffect, useState } from "react";
import * as Types from "@/types";
import Link from "next/link";
import { Time } from "./Time";
import toast from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { ImageViewer } from "./ImageViewer";

interface ActiveCellType {
  cellY: number;
  cellX: number;
  asset: Types.AssetContentType;
}

type PropertiesPanelProps = {
  active: boolean;
  activeCell: ActiveCellType | null;
};

export const CollectionPropertiesPanel: React.FC<PropertiesPanelProps> = ({
  active,
  activeCell,
}) => {
  const [asset, setAsset] = useState<Types.AssetContentType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<boolean>(false);

  useEffect(() => {
    if (activeCell) {
      setLoading(true);
      setAsset(activeCell.asset);
      setLoading(false);
      if (activeCell.asset.heroImage) {
        if (activeCell.asset.heroImage[0] === "h") {
          setImageLink(true);
        }
      } else if (activeCell.asset.file) {
        if (activeCell.asset.file[0] === "h") {
          setImageLink(true);
        }
      }
    }
  }, [activeCell]);

  return (
    <div
      className={`p-2 ${
        active ? "block" : "hidden"
      } space-y-2 overflow-y-auto customScroll h-full w-full overflow-x-hidden`}>
      {!loading ? (
        <>
          <div
            className={`flex justify-center ${
              asset?.file ? null : "border border-lightgreen"
            }`}>
            {asset?.file ? (
              <a href={asset?.file} target="_blank" rel="noreferrer">
                {imageLink ? (
                  <img
                    className={`max-h-[80vh] border border-lightgreen`}
                    src={activeCell?.asset.heroImage || activeCell?.asset.file}
                  />
                ) : (
                  <ImageViewer
                    imageData={Buffer.from(activeCell?.asset.heroImage)}
                  />
                )}
              </a>
            ) : (
              <div className="flex items-center justify-center opacity-50 w-full h-[200px]">
                Click on a cell to view its properties
              </div>
            )}
          </div>
          <div className="p-2 space-y-2 w-full">
            <div className={`font-bold`}>{asset?.name}</div>
            {asset?.file && asset?.file[0] === "h" ? (
              <a
                href={asset?.file}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </div>
                <div className="truncate">{asset?.file}</div>
              </a>
            ) : null}
            <div className={`truncate italic`}>{asset?.source}</div>
            <div>{asset?.notes}</div>
            <div>
              {asset?.lastModified ? (
                <>
                  <Time dateString={asset?.lastModified!} />{" "}
                  <span className="opacity-50">(Last Modified)</span>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <RingLoader color="#00ff00" size={40} />
        </div>
      )}
    </div>
  );
};
