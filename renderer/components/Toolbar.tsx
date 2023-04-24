import Link from "next/link";
import { Tooltip } from "./Tooltip";
import { BsCassette, BsGrid3X3Gap } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { HorizontalLine } from "./HorizontalLine";
import { GiMeshNetwork, GiBlackBook } from "react-icons/gi";

interface ToolBarProps {
  handleActiveTool: (tool: number) => void;
  activeTool: number;
  handlePanelToggle: () => void;
}

export const Toolbar: React.FC<ToolBarProps> = ({
  handleActiveTool,
  activeTool,
  handlePanelToggle,
}) => {
  return (
    <div className="p-3 flex flex-col justify-between">
      <div className="space-y-3">
        <Tooltip tooltip={"Finder"} position={"translate-x-11"}>
          <div
            className={`hover:opacity-100 hover:cursor-pointer ${
              activeTool === 0 ? "opacity-70" : "opacity-30"
            }`}
            onClick={(e) => {
              handleActiveTool(0);
              if (activeTool === 0) {
                handlePanelToggle();
              }
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>
        </Tooltip>
        <Tooltip tooltip={"Collections"} position={"translate-x-11"}>
          <div
            className={`hover:opacity-100 hover:cursor-pointer ${
              activeTool === 1 ? "opacity-70" : "opacity-30"
            }`}
            onClick={(e) => {
              handleActiveTool(1);
              if (activeTool === 1) {
                handlePanelToggle();
              }
            }}>
            <CiGrid41 className="w-8 h-8" />
            
          </div>
        </Tooltip>
        <Tooltip tooltip={"Assets"} position={"translate-x-11"}>
          <div
            className={`hover:opacity-100 hover:cursor-pointer ${
              activeTool === 2 ? "opacity-70" : "opacity-30"
            }`}
            onClick={(e) => {
              handleActiveTool(2);
              if (activeTool === 2) {
                handlePanelToggle();
              }
            }}>
              <GiBlackBook className="w-8 h-8"/>
            
          </div>
        </Tooltip>
        <HorizontalLine />
        <Tooltip tooltip={"Network"} position={"translate-x-11"}>
          <div
            className={`hover:opacity-100 hover:cursor-pointer opacity-30`}>
            <GiMeshNetwork className="w-8 h-8"/>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
