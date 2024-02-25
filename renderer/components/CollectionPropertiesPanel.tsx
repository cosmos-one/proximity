import { useEffect, useState } from "react";
import * as Types from "@/types";
import Link from "next/link";
import { Time } from "./Time";
import toast from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { ImageViewer } from "./ImageViewer";
import { ipcRenderer } from "electron";
import { HorizontalLine } from "./HorizontalLine";

interface ActiveCellType {
  cellY: number;
  cellX: number;
  asset: Types.AssetContentType;
}

type PropertiesPanelProps = {
  active: boolean;
  activeCell: ActiveCellType | null;
  dir: string;
};

export const CollectionPropertiesPanel: React.FC<PropertiesPanelProps> = ({
  active,
  activeCell,
  dir,
}) => {
  const [asset, setAsset] = useState<Types.AssetType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (activeCell?.asset.path) {
      setLoading(true);
      setLoading(false);
      ipcRenderer
        .invoke("collection-asset", {
          req: "GET",
          dir,
          path: activeCell.asset.path,
        })
        .then((res) => {
          setAsset(res);
        });
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
              asset?.heroImage ? null : "border border-lightgreen"
            }`}>
            {asset?.heroImage ? (
              <ImageViewer imageData={Buffer.from(asset?.heroImage)} />
            ) : (
              <div className="flex items-center justify-center opacity-50 w-full h-[200px]">
                Click on a cell to view its properties
              </div>
            )}
          </div>
          <HorizontalLine/>
          <div className=" space-y-2 w-full">
            <div className={`font-bold`}>{asset?.meta.body.name}</div>
            <HorizontalLine/>
            <div className={`truncate italic ${asset?.meta.body.source ? "" : "opacity-50"}`}>{asset?.meta.body.source || "Source"}</div>
            <HorizontalLine/>
            <div className={`${asset?.meta.body.notes ? "" : "opacity-50"}`}>{asset?.meta.body.notes || "Notes"}</div>
            <HorizontalLine/>
            <div>
              {asset?.meta.body.lastModified ? (
                <>
                  <Time dateString={asset?.meta.body.lastModified!} />{" "}
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
