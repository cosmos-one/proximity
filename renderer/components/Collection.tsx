import path from "path";

//Hooks
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
//Types
import * as Types from "@/types";
//Components
import Split from "react-split-it";
import { Time } from "./Time";
import { HorizontalLine } from "./HorizontalLine";
import { Tooltip } from "./Tooltip";
import { Slider } from "./Slider";
import { CollectionViewport } from "./CollectionViewport";
import { CollectionUtilities } from "./CollectionUtilities";
import { toast } from "react-hot-toast";
//Icons
import { IoExpandOutline } from "react-icons/io5";

interface ActiveCellType {
  cellY: number;
  cellX: number;
  asset: Types.AssetTypeCell;
}

export const Collection = ({
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
  dragging,
  setDragging,
}) => {
  //Collection
  const [collection, setCollection] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionX, setCollectionX] = useState(0);
  const [collectionY, setCollectionY] = useState(0);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [content, setContent] = useState([]);
  const [lastModified, setLastModified] = useState("");
  const [contentData, setContentData] = useState([]);

  //Viewport
  const [collectionViewport, setCollectionViewport] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  //Panels
  const [collectionUtilities, setCollectionUtilities] = useState(true);
  const [activeCell, setActiveCell] = useState<ActiveCellType | null>(null);

  console.log(activeCell)

  useEffect(() => {
    setCollection(file.meta);
    setName(file.meta.body.name);
    setDescription(file.meta.body.description);
    setCollectionX(file.meta.body.collectionX);
    setCollectionY(file.meta.body.collectionY);
    setContent(file.meta.body.content);
    setLastModified(`${file.meta.body.lastModified}`);
    //Cell Aspect Ratio
    let width = 100 / Number(file.meta.body.collectionX);
    let height = width / 1.5;
    setCellWidth(width);
    setCellHeight(height);
  }, [file]);

  useEffect(() => {
    //Content Data
    ipcRenderer
      .invoke("collection-viewport", {
        req: "GET",
        dir: dir,
        content: file.meta.body.content,
      })
      .then((res) => {
        setContentData(res);
      });
  }, [content]);

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 83) {
      handleSave();
    } else if (e.keyCode === 8) {
      if (activeCell)
      removeCellAsset(activeCell.cellY, activeCell.cellX)
    }
  };

  const handleSave = () => {
    const fullPath = path.join(dir, file.file);
    const update = ipcRenderer
      .invoke("collection", {
        req: "PATCH",
        path: fullPath,
        collection: { name, description, collectionX, collectionY, content },
        original: collection,
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

  //Collection Metadata
  const handleNameChange = (e) => {
    setName(e.target.value);
    const temp = [...allTabs];
    const replace = temp[tabGroupIndex][tabIndex];
    replace.meta.body.description = e.target.value;
    setTabs(temp);
    handleChanged(tabIndex);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const temp = [...allTabs];
    const replace = temp[tabGroupIndex][tabIndex];
    replace.meta.body.description = e.target.value;
    setTabs(temp);
    handleChanged(tabIndex);
  };

  const handleCollectionViewportScaleSlider = (scale: number[]) => {
    const newScale = scale[0];
    setCollectionViewport({ ...collectionViewport, scale: newScale });
  };

  const handleCellClick = (
    row: number,
    column: number,
    asset: Types.AssetTypeCell
  ) => {
    setActiveCell({ cellY: row, cellX: column, asset: asset });
  };

  const changeCellAsset = (row, column, fileName) => {
    const updatedContent = [...content];
    updatedContent[row][column].path = fileName;
    setContent(updatedContent);
    handleChanged(tabIndex);
  };

  const removeCellAsset = (row, column) => {
    const updatedContent = [...content];
    updatedContent[row][column] = {};
    setContent(updatedContent);
    handleChanged(tabIndex);
  }

  return (
    <div
      className="h-full w-full overflow-hidden flex flex-col opacity-90"
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
      tabIndex={1}>
      <Split
        className="h-full flex"
        direction={"horizontal"}
        sizes={[0.7, 0.2]}
        minSize={150}
        gutterSize={10}>
        <div
          className={`h-full w-full flex flex-col border border-lightgreen ${
            collectionUtilities ? "rounded-tl-md rounded-bl-md" : "rounded-t-md"
          }`}>
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
            <div className="flex items-center space-x-2">
              <Tooltip
                tooltip="Reset Viewport"
                position={"translate-y-10 -translate-x-16"}>
                <IoExpandOutline
                  className={`w-6 h-6 hover:bg-hlgreen rounded-md hover:cursor-pointer`}
                  onClick={() => {
                    setCollectionViewport({ x: 0, y: 0, scale: 1 });
                  }}
                />
              </Tooltip>
              <Tooltip
                tooltip="Utilities"
                position={"translate-y-10 -translate-x-16"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className={`w-6 h-6 hover:bg-hlgreen rounded-md hover:cursor-pointer`}
                  onClick={() => {
                    setCollectionUtilities(!collectionUtilities);
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
          <div className="w-full h-full overflow-hidden">
            <CollectionViewport
              setCollectionViewport={setCollectionViewport}
              collectionViewport={collectionViewport}
              contentData={contentData}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
              handleCellClick={handleCellClick}
              changeCellAsset={changeCellAsset}
              dragging={dragging}
              setDragging={setDragging}
            />
          </div>
        </div>
        {collectionUtilities ? (
          <CollectionUtilities
          dir={dir}
            collection={collection}
            activeCell={activeCell}
            name={name}
            description={description}
            handleNameChange={handleNameChange}
            handleDescriptionChange={handleDescriptionChange}
            handleSave={handleSave}
          />
        ) : null}
      </Split>
    </div>
  );
};
