import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Tooltip } from "@/components/Tooltip";
import { HorizontalLine } from "./HorizontalLine";

const DynamicCollectionInformationPanel = dynamic(() =>
  import("@/components/CollectionInformationPanel").then(
    (mod) => mod.CollectionInformationPanel
  )
);

export const CollectionUtilities = ({ collection }) => {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <div
      className={`rounded-r-md border border-lightgreen h-full w-full flex flex-col`}>
      <div className="flex justify-between">
        <div className="p-2 text-center truncate">
          {activePanel === 0
            ? "Information"
            : activePanel === 1
            ? "Properties"
            : activePanel === 2
            ? "Layout"
            : "Present"}
        </div>
        <div className="p-2 flex space-x-3">
          <Tooltip
            tooltip="Information"
            position={"translate-y-10 -translate-x-18"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer ${
                activePanel === 0 ? null : "opacity-50"
              }`}
              onClick={() => {
                setActivePanel(0);
              }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </Tooltip>
          <Tooltip
            tooltip="Layouts"
            position={"translate-y-10 -translate-x-14"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer ${
                activePanel === 2 ? null : "opacity-50"
              }`}
              onClick={() => {
                setActivePanel(2);
              }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </Tooltip>
          <Tooltip
            tooltip="Present"
            position={"translate-y-10 -translate-x-14"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer ${
                activePanel === 3 ? null : "opacity-50"
              }`}
              onClick={() => {
                setActivePanel(3);
              }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
          </Tooltip>
          <Tooltip
            tooltip="Cell Properties"
            position={"translate-y-10 -translate-x-28"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className={`w-6 h-6 hover:bg-slate-700 rounded-md hover:cursor-pointer ${
                activePanel === 1 ? null : "opacity-50"
              }`}
              onClick={() => {
                setActivePanel(1);
              }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </Tooltip>
        </div>
      </div>
      <HorizontalLine/>
      <DynamicCollectionInformationPanel
        active={activePanel === 0}
        collection={collection}
      />
    </div>
  );
};
