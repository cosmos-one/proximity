import React, { useState, useEffect } from "react";
import { HorizontalLine } from "./HorizontalLine";

export const AssetUtilities = ({
  asset,
  imageData,
  tabIndex,
  handleSave,
  handleChanged,
  handleSaved,
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
    const temp = [...allTabs]
    const replace = temp[tabGroupIndex][tabIndex]
    replace.meta.body.name = e.target.value
    setTabs(temp)
    handleChanged(tabIndex);
  }

  const handleSource = (e) => {
    setSource(e.target.value);
    const temp = [...allTabs]
    const replace = temp[tabGroupIndex][tabIndex]
    replace.meta.body.source = e.target.value
    setTabs(temp)
    handleChanged(tabIndex);
  }

  const handleNotes = (e) => {
    setNotes(e.target.value);
    const temp = [...allTabs]
    const replace = temp[tabGroupIndex][tabIndex]
    replace.meta.body.notes = e.target.value
    setTabs(temp)
    handleChanged(tabIndex);
  }

  return (
    <div
      className={`rounded-r-md border border-lightgreen h-full w-full overflow-hidden flex flex-col`}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }} tabIndex={1}>
      <div className="flex justify-between">
        <div className="p-2 text-center truncate">Properties</div>
        <div className="p-2 flex space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer`}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
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
              handleName(e)
            }}
            placeholder="Name"
          />
        </div>
        <div className="italic">
          <input
            type="text"
            className="border border-lightgreen rounded-md w-full p-1"
            value={source}
            placeholder="Source (Optional)"
            onChange={(e) => {
              handleSource(e)
            }}
          />
        </div>
        <div>
          <textarea
            className="border border-lightgreen rounded-md w-full p-1 bg-black resize-none min-h-[200px] focus:outline-none"
            value={notes}
            placeholder="Notes (Optional)"
            onChange={(e) => {
              handleNotes(e)
            }}
          />
        </div>
        <div></div>
        <HorizontalLine />
        <div>
          Type:<span className="italic">{type}</span>
        </div>
      </div>
    </div>
  );
};
