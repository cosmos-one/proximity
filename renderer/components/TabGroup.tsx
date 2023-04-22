import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import Split from "react-split-it";
import { Editor } from "./Editor"
import { Tooltip } from "./Tooltip";
import { Welcome } from "./Welcome";

export const TabGroup = ({
  dir,
  active,
  tabs,
  index,
  handleNewTab,
  handleCloseTab,
  activeTab,
  handleActiveTab,
  handleNewTabGroup,
  handleActiveTabGroup,
  handleOpenDirectory,
}) => {
  const [changed, setChanged] = useState([]);

  useEffect(() => {
    const change = [];
    for (var i = 0; i < tabs.length; i++) {
      change.push(false);
    }
    setChanged(change);
  }, [tabs]);

  const handleChanged = (index) => {
    const update = [...changed];
    update[index] = true;
    setChanged(update);
  };

  const handleSaved = (index) => {
    const update = [...changed];
    update[index] = false;
    setChanged(update);
  };

  return (
    <>
      {tabs?.length > 0 ? (
        <div
          className="w-full h-full"
          onClick={(e) => {
            handleActiveTabGroup(index);
          }}>
          <Tab.Group selectedIndex={activeTab}>
            <Tab.List>
              <div className="flex items-center justify-between space-x-5">
                <div className="flex whitespace-nowrap overflow-scroll scrollBarHide">
                  {tabs?.map((tab, i) => {
                    return (
                      <Tab key={i}>
                        {({ selected }) => (
                          <div
                            className="group flex items-center ui-selected:bg-white ui-selected:outline-none focus:border-none focus:outline-none p-3 rounded "
                            onClick={(e) => {
                              handleActiveTab(i, index);
                            }}>
                            {tab.id.replace(/\.md$/, "")}
                            {changed[i] ? (
                              <>
                                *
                                <Tooltip
                                  tooltip={"Close (⌥W)"}
                                  position={"translate-y-10 translate-x-4"}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    className="w-4 h-4 rounded-md hover:bg-hlgreen ml-3"
                                    onClick={(e) => {
                                      handleCloseTab(tab.id);
                                    }}>
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </Tooltip>
                              </>
                            ) : selected ? (
                              <Tooltip
                                tooltip={"Close (⌥W)"}
                                position={"translate-y-10 translate-x-4"}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1}
                                  stroke="currentColor"
                                  className="w-4 h-4 rounded-md hover:bg-hlgreen ml-3"
                                  onClick={(e) => {
                                    handleCloseTab(tab.id);
                                  }}>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </Tooltip>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-4 h-4 invisible group-hover:visible hover:bg-mono-700 rounded-md ml-3"
                                onClick={(e) => {
                                  handleCloseTab(tab.id);
                                }}>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </div>
                        )}
                      </Tab>
                    );
                  })}
                </div>
                {active ? (
                  <div className="flex">
                    <Tooltip
                      tooltip={"Split Editor Right (⌥)"}
                      position={"-translate-x-32 translate-y-12"}>
                      <div
                        className="p-2 hover:bg-mono-700 rounded hover:cursor-pointer"
                        onClick={(e) => {
                          handleNewTabGroup();
                        }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                ) : null}
              </div>
            </Tab.List>
            <Tab.Panels>
              {tabs?.map((tab, index) => {
                return (
                  <Tab.Panel key={index}>
                    <Split
                      className="h-[90vh] max-h-[90vh] flex flex-col"
                      direction={"vertical"}
                      minSize={150}
                      gutterSize={10}>
                      <Editor index={index} file={tab} handleChanged={handleChanged} handleSaved={handleSaved} dir={dir}/>
                    </Split>
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          onClick={(e) => {
            handleActiveTabGroup(index);
          }}>
          No File Open
          {/* <Welcome handleOpenDirectory={handleOpenDirectory} /> */}
        </div>
      )}
    </>
  );
};
