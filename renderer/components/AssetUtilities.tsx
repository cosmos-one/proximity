import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";
import { HorizontalLine } from "./HorizontalLine";
import { Tooltip } from "./Tooltip";

export const AssetUtilities = ({
  asset,
  imageData,
  tabIndex,
  handleSave,
  handleChanged,
  setTabs,
  allTabs,
  tabGroupIndex,
}) => {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setName(asset?.body?.name);
    setSource(asset?.body?.source);
    setNotes(asset?.body?.notes);
    setType(asset?.body?.type);
  }, [asset]);

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 83) {
      const data = {
        name,
        source,
        notes,
        type,
      };
      handleSave(data);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
    const temp = [...allTabs];
    const replace = temp[tabGroupIndex][tabIndex];
    replace.meta.body.name = e.target.value;
    setTabs(temp);
    handleChanged(tabIndex);
  };

  const handleSource = (e) => {
    setSource(e.target.value);
    const temp = [...allTabs];
    const replace = temp[tabGroupIndex][tabIndex];
    replace.meta.body.source = e.target.value;
    setTabs(temp);
    handleChanged(tabIndex);
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
    const temp = [...allTabs];
    const replace = temp[tabGroupIndex][tabIndex];
    replace.meta.body.notes = e.target.value;
    setTabs(temp);
    handleChanged(tabIndex);
  };

  return (
    <div
      className={`rounded-r-md border border-lightgreen h-full w-full overflow-hidden flex flex-col`}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
      tabIndex={1}>
      <div className="flex justify-between">
        <div className="p-2 text-center truncate">Properties</div>
        <div className="p-2 flex space-x-3">
          <Tooltip
            tooltip="Save Changes (^S)"
            position={"translate-y-10 -translate-x-32"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-hlgreen rounded-md hover:cursor-pointer"
              onClick={() => {
                handleSave({ name, source, notes, type });
              }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </Tooltip>
        </div>
      </div>
      <HorizontalLine />
      <div className="p-2 space-y-2 h-full w-full overflow-y-auto customScroll">
        {type?.includes("image") ? null : (
          <>
            {imageData && (
              <img
                className="border border-lightgreen max-h-[50vh] w-full"
                src={`data:image/png;base64,${Buffer.from(imageData).toString(
                  "base64"
                )}`}
                alt={name}
              />
            )}
          </>
        )}

        <div className="font-semibold">
          <input
            className="border border-lightgreen rounded-md w-full p-1"
            type="text"
            value={name}
            onChange={(e) => {
              handleName(e);
            }}
            placeholder="Name"
          />
        </div>
        <div className="italic">
          <input
            type="text"
            className="border border-lightgreen rounded-md w-full p-1"
            value={source}
            placeholder="Source"
            onChange={(e) => {
              handleSource(e);
            }}
          />
        </div>
        <div>
          <textarea
            className="border border-lightgreen rounded-md w-full p-1 bg-black resize-none min-h-[200px] focus:outline-none"
            value={notes}
            placeholder="Notes"
            onChange={(e) => {
              handleNotes(e);
            }}
            onBlur={() => {}}
          />
        </div>
        <HorizontalLine />
        <div>
          Type:<span className="italic">{type}</span>
        </div>
      </div>
    </div>
  );
};
