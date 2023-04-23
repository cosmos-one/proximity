import { useEffect, useState } from "react";
import Split from "react-split-it";
import { Time } from "./Time";
import { Tooltip } from "./Tooltip";
import { Slider } from "./Slider";
import { CollectionViewport } from "./CollectionViewport";
import { HorizontalLine } from "./HorizontalLine";
import { CollectionUtilities } from "./CollectionUtilities";

export const Collection = ({ file, dir }) => {
  //Collection
  const [collection, setCollection] = useState({});
  const [name, setName] = useState("");
  const [collectionX, setCollectionX] = useState(0);
  const [collectionY, setCollectionY] = useState(0);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [content, setContent] = useState([]);
  const [lastModified, setLastModified] = useState("");

  //Viewport
  const [collectionViewport, setCollectionViewport] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  //Panels
  const [collectionUtilities, setCollectionUtilities] = useState(true);

  useEffect(() => {
    setCollection(file.data);
    setName(file.data.body.name);
    setCollectionX(file.data.body.x);
    setCollectionY(file.data.body.y);
    setContent(file.data.body.content);
    setLastModified(`${file.data.body.lastModified}`);
    //Cell Aspect Ratio
    let width = 100 / Number(file.data.body.x);
    let height = width / 1.5;
    setCellWidth(width);
    setCellHeight(height);
  }, [file]);

  const handleCollectionViewportScaleSlider = (scale: number[]) => {
    const newScale = scale[0];
    setCollectionViewport({ ...collectionViewport, scale: newScale });
  };

  return (
    <div className="h-full w-full overflow-hidden flex flex-col opacity-90">
      <Split
        className="h-full flex"
        direction={"horizontal"}
        sizes={[0.7, 0.2]}
        minSize={150}
        gutterSize={10}>
        <div className={`h-full w-full border border-lightgreen ${collectionUtilities ? "rounded-tl-md rounded-bl-md" : "rounded-t-md"}`}>
          <div className="flex items-center justify-between p-2">
            <div className="text-xs italic">
              {lastModified ? <Time dateString={lastModified} /> : null}
            </div>
            <div>
              <Slider
                min={0.1}
                max={8}
                step={0.1}
                value={[collectionViewport.scale]}
                setValue={handleCollectionViewportScaleSlider}
              />
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
                  className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer`} onClick={() => {setCollectionUtilities(!collectionUtilities)}}>
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
          <div className="w-full h-full">
            <CollectionViewport
              setCollectionViewport={setCollectionViewport}
              collectionViewport={collectionViewport}
              content={content}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
            />
          </div>
        </div>
        {collectionUtilities ? (<CollectionUtilities collection={collection}/>) : null}
      </Split>
    </div>
  );
};
