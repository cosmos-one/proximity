import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";
import { PopDropdown } from "./PopDropdown";

interface CollectionPanelProps {
  active: boolean;
  dir: string;
  files: string[];
  handleOpenNewDirectory: () => void;
  handleNewTab: (file: string) => void;
}

export const FilePanel: React.FC<CollectionPanelProps> = ({
  active,
  dir,
  files,
  handleOpenNewDirectory,
  handleNewTab,
}) => {
  const [fileArchive, setFileArchive] = useState([]);

  //Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = files
      .map((filePath) => {
        if (
          !filePath.includes(".git") &&
          !filePath.includes(".manto") &&
          !filePath.includes(".DS_Store") &&
          !filePath.includes("/.")
        ) {
          return path.relative(dir, filePath);
        }
        return null;
      })
      .filter((file) => {
        return file != null;
      });
    setFileArchive(filtered);
  }, [dir]);

  return (
    <div
      className={`py-3 opacity-50 hover:opacity-90 duration-150 ${
        active ? "flex flex-col h-full overflow-hidden space-y-4" : "hidden"
      }`}>
      <div className="group flex justify-between items-center w-full overflow-hidden">
        <div className="flex items-center space-x-4">
          <div>FINDER</div>
          {loading ? <RingLoader color="#00ff00" size={20} /> : null}
        </div>
        {dir ? (
          <div>
            <PopDropdown>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6 hover:cursor-pointer hover:bg-hlgreen rounded-md">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </PopDropdown>
          </div>
        ) : null}
      </div>
      <div className="overflow-y-auto h-full">
        {dir ? (
          <div>
            <FileList filePaths={fileArchive} handleNewTab={handleNewTab} />
          </div>
        ) : (
          <div className="w-full justify-center flex">
            <Button
              button="Open Folder"
              submit={() => {
                handleOpenNewDirectory();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
