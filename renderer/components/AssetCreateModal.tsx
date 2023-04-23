import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { toast } from "react-hot-toast";
import { HorizontalLine } from "./HorizontalLine";
import { ipcRenderer } from "electron";

type AssetCreateModalProps = {
  toggle: () => void;
  modal: boolean;
  dir: string;
  refresh: () => void;
};

type PreviewAsset = {
  filePath: string;
  name: string;
  source: string;
  notes: string;
  type: string;
};

export const AssetCreateModal: React.FC<AssetCreateModalProps> = ({
  toggle,
  modal,
  dir,
  refresh,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [previews, setPreviews] = useState<PreviewAsset[]>([]);
  const [isUrlInvalid, setIsUrlInvalid] = useState<boolean>(true);
  const [sourceLink, setSourceLink] = useState<string>("");
  const [folders, setFolders] = useState<any[]>([]);
  const [focusFolder, setFocusFolder] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      setPreviews((prevPreviews) =>
        prevPreviews.concat([
          {
            filePath: file.path,
            name: file.name,
            type: file.type,
            source: "",
            notes: "",
          },
        ])
      );
    }
  };

  const handleSourceLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    setSourceLink(event.target.value);
    if (urlRegex.test(event.target.value)) {
      setIsUrlInvalid(false);
    } else {
      setIsUrlInvalid(true);
    }
  };

  const handleSourceLinkSearch = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!sourceLink) return;
    try {
      toast(`Searching for Preview`, {
        style: {
          background: "#000000",
          border: "1px solid #00ff00",
          color: "#00ff00",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews]; // create a new array
      newPreviews[i] = { ...prevPreviews[i], name: event.target.value }; // update the name property of the selected preview
      return newPreviews; // update the state with the new array
    });
  };

  const handleSourceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews]; // create a new array
      newPreviews[i] = { ...prevPreviews[i], source: event.target.value }; // update the name property of the selected preview
      return newPreviews; // update the state with the new array
    });
  };

  const handleNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    i: number
  ) => {
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews]; // create a new array
      newPreviews[i] = { ...prevPreviews[i], notes: event.target.value }; // update the name property of the selected preview
      return newPreviews; // update the state with the new array
    });
  };

  const handleCreateAsset = async () => {
    if (previews.length === 0) {
      toast.error(`No assets to upload.`, {
        style: {
          background: "#000000",
          border: "1px solid #00ff00",
          color: "#00ff00",
        },
      });
      return;
    } else {
      try {
        const createAssets = ipcRenderer.invoke("asset", {
          req: "POST",
          path: dir,
          data: previews,
        });
        toast.promise(
          createAssets,
          {
            loading: `Creating assets`,
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
        refresh();
        toggle();
      } catch (err) {
        toast.error(`Something went wrong. Please try again.`, {
          style: {
            background: "#000000",
            border: "1px solid #00ff00",
            color: "#00ff00",
          },
        });
        console.log(err);
      }
    }
  };

  const handleClear = () => {
    setPreviews([]);
    setIsUrlInvalid(true);
    setSourceLink("");
  };

  return (
    <Modal toggle={toggle} modal={modal} name={"Create Assets"}>
      <div className="space-y-5 h-full w-full flex flex-col">
        <div>
          Drag files into the box or paste URL for videos and web pages.
        </div>
        <HorizontalLine />
        <div className="grid grid-cols-2 h-[50vh] w-[800px] overflow-hidden">
          {/* Upload */}
          <div className="w-full h-full space-y-5 p-2 flex flex-col">
            <div
              className={`flex content-between items-center justify-center border border-lightgreen rounded-md h-full p-5 ${
                dragActive ? "bg-green" : "border-dashed"
              }`}>
              <div>
                <input
                  className="hidden"
                  id="file-input"
                  type="file"
                  onChange={(event) => handleFileChange(event)}
                  accept=".pdf,image/*, video/*"
                  required
                  multiple
                />
                <label
                  htmlFor="file-input"
                  className="inline-flex items-center px-4 py-2 bg-black border border-green rounded-md shadow-sm text-sm font-medium text-green hover:bg-green hover:text-black hover:cursor-pointer duration-150">
                  Choose file
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <hr className="border-t-lightgreen w-full" />
              <p>OR</p>
              <hr className="border-t-lightgreen w-full" />
            </div>
            <div className="w-full">
              <label htmlFor="tag" className="block text-sm font-medium mb-2">
                Source Link
              </label>
              <div className="flex space-x-2">
                <input
                  value={sourceLink}
                  onChange={handleSourceLink}
                  type="text"
                  id="tag"
                  className="p-1 border border-lightgreen rounded-md w-full"
                />
                <Button
                  button="Search"
                  submit={handleSourceLinkSearch}
                  disabled={isUrlInvalid}
                />
              </div>
            </div>
          </div>
          {/* Previews */}
          <div className="w-full h-full space-y-5 p-2 flex flex-col overflow-hidden">
            <div className="font-bold">Asset Previews</div>
            <div className="h-full  w-full overflow-y-auto customScroll space-y-2 pr-4">
              {previews.length > 0 ? (
                <>
                  {Array.from(previews).map((preview, index) => (
                    <div className="w-full flex flex-col space-y-2" key={index}>
                      {/* {
                        preview.type === "application/pdf" ?
                          <>
                            <embed src={preview.file} className="w-full h-[250px]" type='application/pdf'></embed>
                          </>
                          :
                          /image\//.test(preview.type) ?
                            <div className='w-full'>
                              <img className='h-full object-cover max-w-[250px]' src={preview.file} />
                            </div>
                          :
                          /video\//.test(preview.type) ?
                            <div className='w-full'>
                              <video src={preview.file}>
                              <source src={preview.file} type="video/mp4"/>
                              <source src={preview.file} type="video/webm"/>
                              <source src={preview.file} type="video/ogg"/>
                              </video>
                            </div>
                          :
                          preview.type === "weblink" ?
                              <div className='w-full'>
                                <img className='h-full object-cover' src={preview.heroImage} />
                              </div>
                          : null
                      } */}
                      <div className="w-full">
                        <input
                          className="border border-lightgreen rounded-md w-full p-1"
                          value={preview.name}
                          placeholder="Name"
                          onChange={(event) => handleNameChange(event, index)}
                        />
                      </div>
                      <div className="w-full">
                        <input
                          className={`border border-lightgreen rounded-md w-full p-1 ${
                            preview.source?.length > 0 ? null : "opacity-50"
                          }`}
                          placeholder="Source (optional)"
                          value={preview.source}
                          onChange={(event) => handleSourceChange(event, index)}
                        />
                      </div>
                      <div className="w-full">
                        <textarea
                          className={`border border-lightgreen rounded-md w-full p-1 bg-black resize-none focus:outline-none ${
                            preview.notes?.length > 0 ? null : "opacity-50"
                          }`}
                          placeholder="Notes (optional)"
                          value={preview.notes}
                          onChange={(event) => handleNotesChange(event, index)}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
        <HorizontalLine />
        <div className="flex space-x-2 justify-between">
          <div className="flex space-x-2">
            <Button button={"Add Assets"} submit={handleCreateAsset} />
            <Button button="Clear" submit={handleClear} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
