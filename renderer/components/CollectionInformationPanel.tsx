import { useEffect, useState } from "react";
import { Time } from "./Time";
import RingLoader from "react-spinners/RingLoader";
import { HorizontalLine } from "./HorizontalLine";

export const CollectionInformationPanel = ({
  active,
  handleSave,
  name,
  description,
  handleNameChange,
  handleDescriptionChange,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 83) {
      handleSave();
    }
  };

  return (
    <div
      className={`p-2 ${
        active ? "block" : "hidden"
      } space-y-2 overflow-y-auto customScroll`}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
      tabIndex={1}>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <RingLoader color="#00ff00" size={40} />
        </div>
      ) : (
        <>
          <div className="font-semibold">
            <input
              className="border border-lightgreen rounded-md w-full p-1"
              type="text"
              value={name}
              onChange={(e) => {
                handleNameChange(e);
              }}
              placeholder="Name"
            />
          </div>
          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => {
                handleDescriptionChange(e);
              }}
              className="w-full h-full border border-lightgreen bg-black resize-none min-h-[300px] rounded-md focus:outline-none p-1"
            />
          </div>
          <HorizontalLine />
        </>
      )}
    </div>
  );
};
