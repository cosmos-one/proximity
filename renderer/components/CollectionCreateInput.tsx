import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Types from "@/types";
import { ipcRenderer } from "electron";

type CollectionCreateInputProps = {
  toggle: () => void;
  dir: string;
  refresh: () => void;
};

export const CollectionCreateInput: React.FC<CollectionCreateInputProps> = ({
  toggle,
  dir,
  refresh,
}) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleCreateCollectionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateCollection = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setInput("");
      toggle();
    } else if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        return toast.error("Collection name cannot be empty", {
          style: {
            background: "#000000",
            border: "1px solid #00ff00",
            color: "#00ff00",
          },
        });
      } else {
        const createCollection = ipcRenderer
          .invoke("collection", {
            req: "POST",
            path: dir,
            name: e.currentTarget.value,
          })
          .then((res) => {
            setInput("");
            toggle();
            refresh();
          });
        toast.promise(
          createCollection,
          {
            loading: `Creating ${e.currentTarget.value}...`,
            success: `Success, redirecting you to ${e.currentTarget.value}...`,
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
      }
    }
  };

  return (
    <div className="py-2">
      <input
        type="text"
        className="border border-green w-full rounded-md"
        onChange={(e) => {
          handleCreateCollectionInput(e);
        }}
        onKeyDown={(e) => {
          handleCreateCollection(e);
        }}
        value={input}
        onBlur={() => {
          toggle();
        }}
      />
    </div>
  );
};
