import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";
import { NewFileDropdown } from "./NewFileDropdown";

interface CollectionPanelProps {
  active: boolean;
  dir: string;
  files: string[];
  handleOpenNewDirectory: () => void;
  handleNewTab: (file: string) => void;
  refresh: () => void;
}

export const FilePanel: React.FC<CollectionPanelProps> = ({
  active,
  dir,
  files,
  handleOpenNewDirectory,
  handleNewTab,
  refresh,
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
            <NewFileDropdown collectionCreateInputToggle={() => {setCollectionCreateInput(!collectionCreateInput)}}/>
          </div>
        ) : null}
      </div>
      <div className="overflow-y-auto h-full">
        {dir ? (
          <div>
            <FileList refresh={refresh} filePaths={fileArchive} dir={dir} handleNewTab={handleNewTab} collectionCreateInput={collectionCreateInput} collectionCreateInputToggle={() => {setCollectionCreateInput(!collectionCreateInput)}}/>
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
