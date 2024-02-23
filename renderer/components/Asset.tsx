import path from "path";
import Split from "react-split-it";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { Tooltip } from "./Tooltip";
import { HorizontalLine } from "./HorizontalLine";
import { AssetUtilities } from "./AssetUtilities";
import { Time } from "./Time";
import { AssetViewport } from "./AssetViewport";
import { toast } from "react-hot-toast";

export const Asset = ({
  file,
  dir,
  tabIndex,
  handleChanged,
  handleSaved,
  unsaved,
  setTabs,
  allTabs,
  tabGroupIndex,
  refresh,
  updateTab,
}) => {
  const [assetUtilities, setAssetUtilities] = useState(true);
  const [asset, setAsset] = useState({});
  const [lastModified, setLastModified] = useState("");
  const [imageData, setImageData] = useState<Buffer>();
  const [fileData, setFileData] = useState<Buffer>();

  useEffect(() => {
    setAsset(file.meta);
    setLastModified(`${file.meta.body.lastModified}`);
    setImageData(Buffer.from(file.heroImage));
    setFileData(Buffer.from(file.fileData));
  }, [file]);

  const handleSave = (data) => {
    const fullPath = path.join(dir, file.file);
    const update = ipcRenderer
      .invoke("asset", {
        req: "PATCH",
        path: fullPath,
        update: data,
        original: asset,
        fileData,
        imageData,
      })
      .then((res) => {
        handleSaved(tabIndex);
        updateTab(tabIndex, res);
        refresh();
      });
    toast.promise(
      update,
      {
        loading: "Saving...",
        success: "Saved!",
        error: "Error saving.",
      },
      {
        style: {
          background: "#000000",
          border: "1px solid #00ff00",
          color: "#00ff00",
        },
      }
    );
  };
  console.log(assetUtilities)
  console.log()

  return (
    <div className="h-full w-full overflow-hidden flex flex-col opacity-90">
      <Split
        className="h-full flex"
        direction={"horizontal"}
        sizes={[0.7, 0.2]}
        minSize={150}
        gutterSize={10}>
        <div
          className={`h-full w-full flex flex-col border border-lightgreen ${
            assetUtilities ? "rounded-tl-md rounded-bl-md" : "rounded-t-md"
          }`}>
          <div className="flex items-center justify-between p-2">
            <div className="text-xs italic">
              {lastModified ? <Time dateString={lastModified} /> : null}{" "}
              {unsaved ? "(Unsaved Changes)" : null}
            </div>
            <div>
              <Tooltip
                tooltip="Utilities"
                position={"translate-y-10 -translate-x-16"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer`}
                  onClick={() => {
                    setAssetUtilities(!assetUtilities);
                  }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                  />
                </svg>
              </Tooltip>
            </div>
          </div>
          <HorizontalLine />
          <AssetViewport
            asset={asset}
            fileData={fileData}
            heroImage={imageData}
          />
        </div>
        {assetUtilities ? (
          <AssetUtilities
            asset={asset}
            imageData={imageData}
            tabIndex={tabIndex}
            handleSave={handleSave}
            handleChanged={handleChanged}
            setTabs={setTabs}
            allTabs={allTabs}
            tabGroupIndex={tabGroupIndex}
          />
        ) : null}
      </Split>
    </div>
  );
};
