import Link from "next/link";
import { Tooltip } from "./Tooltip";

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
    <div className="p-5 flex flex-col justify-between">
      <div className="space-y-5">
        <Tooltip tooltip={"Home"} position={"translate-x-11"}>
          <Link href={"/home"}>
            <div className="opacity-50 hover:opacity-100 hover:cursor-pointer">
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
          </Link>
        </Tooltip>
        {/* <Tooltip tooltip={"Network"} position={"translate-x-11"}>
                    <Link href={"/network"}>
                        <div className={`hover:opacity-100 hover:cursor-pointer opacity-50`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" className="w-8 h-8">
                            <path stroke="rgba(0,255,0,1)" strokeWidth="0.75" d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM14.5 2C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2zM14.5 4C12.567 4 11 5.567 11 7.5s1.567 3.5 3.5 3.5S18 9.433 18 7.5 16.433 4 14.5 4z"/>
                        </svg>
                        </div>
                    </Link>
                </Tooltip> */}
        <hr className="border-t border-green opacity-50" />
        <Tooltip tooltip={"Collections"} position={"translate-x-11"}>
          <div
            className={`hover:opacity-100 hover:cursor-pointer ${
              activeTool === 0 ? "" : "opacity-50"
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
      </div>
      <div>
        <div className="-rotate-90 absolute origin-top-left">
          <a
            className="hover:cursor-pointer hover:opacity-70 duration-100"
            href="https://www.cosmosone.xyz/"
            target={"_blank"}
            rel="noreferrer">
            Cosmosone
          </a>{" "}
          /{" "}
          <span className="hover:cursor-pointer hover:opacity-70 duration-100">
            Proximity
          </span>
        </div>
      </div>
    </div>
  );
};
