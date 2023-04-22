import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";

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
      className={`p-5 ${
        active ? "flex flex-col h-full overflow-hidden space-y-4" : "hidden"
      }`}>
      <div className="group flex justify-between items-center w-full overflow-hidden">
        <div className="flex items-center space-x-4">
          {dir ? (
            <div className="font-bold">{path.basename(dir)}</div>
          ) : (
            <div>No Folder Selected</div>
          )}
          {loading ? <RingLoader color="#00ff00" size={20} /> : null}
        </div>
      </div>
      <div className="overflow-y-auto h-full">
        {dir ? (
          <div>
            <FileList filePaths={fileArchive} handleNewTab={handleNewTab}/>
          </div>
        ) : (
          <div>
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
