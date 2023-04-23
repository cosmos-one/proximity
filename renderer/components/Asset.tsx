import Split from "react-split-it";
import { useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";
import { HorizontalLine } from "./HorizontalLine";
import { AssetUtilities } from "./AssetUtilities";
import { Time } from "./Time";

export const Asset = ({ file, dir }) => {
  const [assetUtilities, setAssetUtilities] = useState(true);
  const [asset, setAsset] = useState({});
  const [lastModified, setLastModified] = useState("");
  const [imageData, setImageData] = useState<Buffer>();

  useEffect(() => {
    setAsset(file.meta);
    setLastModified(`${file.meta.body.lastModified}`);
    setImageData(file.heroImage)
  }, [file]);

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
              {lastModified ? <Time dateString={lastModified} /> : null}
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
        </div>
        {assetUtilities ? <AssetUtilities asset={asset} imageData={imageData}/> : null}
      </Split>
    </div>
  );
};
