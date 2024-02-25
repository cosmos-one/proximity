import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";

interface CollectionPanelProps {
  active: boolean;
  dir: string;
  files: string[];
  handleNewTab: (file: string) => void;
  refresh: () => void;
  setDragging: React.Dispatch<React.SetStateAction<string>>;
}

export const CollectionPanel: React.FC<CollectionPanelProps> = ({
  active,
  dir,
  files,
  handleNewTab,
  refresh,
  setDragging,
}) => {
  //Files
  const [fileArchive, setFileArchive] = useState([]);
  //Loading
  const [loading, setLoading] = useState(false);
  //Create
  const [collectionCreateInput, setCollectionCreateInput] = useState(false);

  useEffect(() => {
    const filtered = files
      .map((filePath) => {
        if (filePath.includes(".pcol")) {
          return path.relative(dir, filePath);
        }
        return null;
      })
      .filter((file) => {
        return file != null;
      });
    setFileArchive(filtered);
  }, [dir, files]);

  return (
    <div
      className={`py-3 duration-150 ${
        active ? "flex flex-col h-full overflow-hidden space-y-4" : "hidden"
      }`}>
      <div className="group flex justify-between items-center w-full overflow-hidden">
        <div className="flex items-center space-x-4">
          <div>COLLECTIONS</div>
          {loading ? <RingLoader color="#00ff00" size={20} /> : null}
        </div>
        {dir ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6 hover:cursor-pointer hover:bg-hlgreen rounded-md"
              onClick={() => {
                setCollectionCreateInput(!collectionCreateInput);
              }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="overflow-y-auto h-full">
        {dir ? (
          <div>
            <FileList
              setDragging={setDragging}
              refresh={refresh}
              filePaths={fileArchive}
              dir={dir}
              handleNewTab={handleNewTab}
              collectionCreateInput={collectionCreateInput}
              collectionCreateInputToggle={() => {
                setCollectionCreateInput(!collectionCreateInput);
              }}
            />
          </div>
        ) : (
          <div className="w-full justify-center flex">
            No directory selected.
          </div>
        )}
      </div>
    </div>
  );
};
