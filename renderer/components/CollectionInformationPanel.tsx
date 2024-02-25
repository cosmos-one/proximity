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

  return (
    <div
      className={`p-2 ${
        active ? "block" : "hidden"
      } space-y-2 flex flex-col w-full h-full`}>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <RingLoader color="#00ff00" size={40} />
        </div>
      ) : (
        <>
          <div className="font-semibold">
            <input
              className="w-full p-1"
              type="text"
              value={name}
              onChange={(e) => {
                handleNameChange(e);
              }}
              placeholder="Name"
            />
          </div>
          <HorizontalLine />
          <div className="w-full h-full overflow-y-auto customScroll">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => {
                handleDescriptionChange(e);
              }}
              className="w-full h-full bg-black resize-none min-h-[300px]  focus:outline-none p-1"
            />
          </div>
          <HorizontalLine />
        </>
      )}
    </div>
  );
};
