import React, { useEffect, useState } from "react";
import * as Types from "@/types";
import toast from "react-hot-toast";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { RingLoader } from "react-spinners";
import { ipcRenderer } from "electron";
import { HorizontalLine } from "./HorizontalLine";
import { ImageViewer } from "./ImageViewer";

type CollectionFloodModalProps = {
  dir: string;
  modal: boolean;
  toggle: () => void;
  empty: number;
  content: any[][];
  updateContent: (content: any[][]) => void;
  setEmptyCells: React.Dispatch<React.SetStateAction<number>>;
};

export const CollectionFloodModal: React.FC<CollectionFloodModalProps> = ({
  dir,
  modal,
  toggle,
  empty,
  content,
  updateContent,
  setEmptyCells,
}) => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<Types.AssetType[] | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<Types.AssetType[]>([]);

  useEffect(() => {
    setLoading(true);
    ipcRenderer.invoke("assets", { req: "GET", path: dir }).then((res) => {
      setLoading(false);
      setAssets(res);
    });
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    ipcRenderer.invoke("assets", { req: "GET", path: dir }).then((res) => {
      setLoading(false);
      setAssets(res);
    });
  }

  const handleSelect = (asset: Types.AssetType) => {
    //Remove if alread inside
    if (selectedAssets.includes(asset)) {
      const filtered = selectedAssets.filter((selectedAsset) => {
        return selectedAsset.id !== asset.id;
      });
      setSelectedAssets(filtered);
    }
    setSelectedAssets([...selectedAssets, asset]);
  };

  const floodContent = async (
    content: any[][],
    assets: Types.AssetBodyType[]
  ) => {
    let objIndex = 0;
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        if (Object.keys(content[i][j]).length === 0) {
          if (objIndex >= assets.length) {
            break;
          }
          content[i][j] = assets[objIndex];
          objIndex++;
        }
      }
    }
    return content;
  };

  const handleFlood = () => {
    if (selectedAssets.length === 0) {
      return toast.error("No assets selected", {
        style: {
          background: "#000000",
          border: "1px solid #00ff00",
          color: "#00ff00",
        },
      });
    } else if (selectedAssets.length > empty) {
      toast.error(
        "Too many assets selected. Not enough empty cells in the collection.",
        {
          style: {
            background: "#000000",
            border: "1px solid #00ff00",
            color: "#00ff00",
          },
        }
      );
    } else {
      const fitAssetType: Types.AssetContentType[] = [];
      for (let i = 0; i < selectedAssets.length; i++) {
        const asset: Types.AssetContentType = {
          id: selectedAssets[i].meta.body.id,
          name: selectedAssets[i].meta.body.name,
          file: selectedAssets[i].fileData.toString('base64'),
          type: selectedAssets[i].meta.body.type,
          source: selectedAssets[i].meta.body.source,
          notes: selectedAssets[i].meta.body.notes,
          heroImage: selectedAssets[i].heroImage.toString('base64'),
          createdAt: selectedAssets[i].meta.body.createdAt,
          lastModified: selectedAssets[i].meta.body.lastModified,
        };
        fitAssetType.push(asset);
      }
      const flood = floodContent(content, fitAssetType).then((res) => {
        updateContent(res);
        setSelectedAssets([]);
        toggle();
      });
      toast.promise(
        flood,
        {
          loading: `Flooding collection...`,
          success: `Success!`,
          error: "Something went wrong. Please try again.",
        },
        {
          style: {
            background: "#000000",
            border: "1px solid #00ff00",
            color: "#00ff00",
          },
        }
      );
    }
  };

  return (
    <Modal name="Flood Collection" modal={modal} toggle={toggle}>
      <div className="h-full w-full overflow-hidden flex flex-col space-y-2">
        <div>
          Select a batch of assets to populate the collection with. Existing
          assets inside the collection will not be moved.
        </div>
        <div>
          There are <span className="font-bold">{empty}</span> empty cells
          remaining in the collection.
        </div>
        {loading ? (
          <div className="h-full w-full flex items-center justify-center p-10">
            <RingLoader color="#00ff00" />
          </div>
        ) : (
          <div
            className={`h-full w-full space-y-5 overflow-hidden flex flex-col`}>
            <div>
              <input
                type="text"
                className="border border-lightgreen rounded-md w-full p-1"
                placeholder="Search assets"
              />
            </div>
            <div className="h-full space-y-5 overflow-y-auto pr-4 customScroll">
              <div className="grid grid-cols-8 h-full group">
                {assets?.map((asset: Types.AssetType) => {
                  return (
                    <div
                      key={asset.id}
                      className={`m-2 hover:opacity-50 hover:cursor-pointer duration-100 ${
                        selectedAssets.includes(asset)
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                      onClick={() => {
                        handleSelect(asset);
                      }}>
                      <div className={`h-[150px] border border-lightgreen`}>
                        <ImageViewer imageData={Buffer.from(asset.heroImage)} />
                      </div>
                      <div className="truncate py-1">
                        {asset.meta.body.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <HorizontalLine />
            <div className="flex items-center justify-between space-x-2 w-full">
              <Button
                button="Populate Collection with Selected Assets"
                submit={handleFlood}
              />
              <Button button="Refresh" submit={handleRefresh} />
              {selectedAssets.length > 0 ? (
                <Button
                  button="Clear Selection"
                  submit={() => {
                    setSelectedAssets([]);
                  }}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
