import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";
import { NewFileDropdown } from "./NewFileDropdown";

interface FilePanelProps {
  active: boolean;
  dir: string;
  files: string[];
  handleOpenNewDirectory: () => void;
  handleNewTab: (file: string) => void;
  refresh: () => void;
  setDragging: React.Dispatch<React.SetStateAction<string>>;
}

export const FilePanel: React.FC<FilePanelProps> = ({
  active,
  dir,
  files,
  handleOpenNewDirectory,
  handleNewTab,
  refresh,
  setDragging
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
  }, [dir, files]);

  return (
    <div
      className={`py-3 duration-150 ${
        active ? "flex flex-col h-full overflow-hidden space-y-4" : "hidden"
      }`}>
      <div className="group flex justify-between items-center w-full overflow-hidden">
        <div className="flex items-center space-x-4">
          <div>FINDER</div>
          {loading ? <RingLoader color="#00ff00" size={20} /> : null}
        </div>
      </div>
      <div className="overflow-y-auto h-full">
        {dir ? (
          <div>
            <FileList setDragging={setDragging} refresh={refresh} filePaths={fileArchive} dir={dir} handleNewTab={handleNewTab} collectionCreateInput={collectionCreateInput} collectionCreateInputToggle={() => {setCollectionCreateInput(!collectionCreateInput)}}/>
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
