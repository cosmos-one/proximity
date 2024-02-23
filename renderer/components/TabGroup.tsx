import path from "path";
import { useEffect, useState } from "react";
//Components
import Split from "react-split-it";
import { Tab } from "@headlessui/react";
import { Collection } from "./Collection";
import { Asset } from "./Asset";
import { Editor } from "./Editor";
import { Image } from "./Image";
import { PDF } from "./PDF";
import { Tooltip } from "./Tooltip";
import { Welcome } from "./Welcome";
//Icons
import { BsCircleFill } from "react-icons/bs";
import { FileIcon } from "./FileIcon";

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
  setTabs,
  allTabs,
  tabGroupIndex,
  refresh,
  updateTab,
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

  const isImage = (filename) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filename.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  return (
    <>
      {dir ? (
        <>
          {tabs?.length > 0 ? (
            <div
              className="w-full h-full overflow-hidden flex flex-col"
              onClick={(e) => {
                handleActiveTabGroup(index);
              }}>
              <Tab.Group selectedIndex={activeTab}>
                <Tab.List>
                  <div className="flex items-center justify-between space-x-5 h-full">
                    <div className="flex whitespace-nowrap overflow-scroll scrollBarHide">
                      {tabs?.map((tab, i) => {
                        return (
                          <Tab
                            key={i}
                            className={"focus:outline-none focus:border-none"}>
                            {({ selected }) => (
                              <div
                                className={`group flex items-center ${
                                  selected ? " opacity-100" : "opacity-30"
                                } focus:border-none focus:outline-none p-2 rounded-sm hover:opacity-100 duration-150 max-w-[300px]`}
                                onClick={(e) => {
                                  handleActiveTab(i, index);
                                }}>
                                <div>
                                  <FileIcon fileType={path.extname(tab.id)} />
                                </div>
                                <div className="ml-2 truncate">
                                  {tab.id.replace(/\.[^.]*$/, "")}
                                </div>

                                {changed[i] ? (
                                  <>
                                    <span className="ml-2">
                                      <BsCircleFill className="h-2 w-2" />
                                    </span>
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
                          position={"-translate-x-36 translate-y-12"}>
                          <div
                            className="p-1 hover:bg-hlgreen rounded hover:cursor-pointer"
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
                <Tab.Panels className="h-full w-full overflow-hidden">
                  {tabs?.map((tab, index) => {
                    return (
                      <Tab.Panel
                        key={index}
                        className="flex flex-col h-full w-full overflow-hidden">
                        <Split
                          className="h-full w-full flex flex-col"
                          direction={"vertical"}
                          minSize={150}
                          gutterSize={10}>
                          {tab.id.includes(".md") ? (
                            <Editor
                              index={index}
                              file={tab}
                              handleChanged={handleChanged}
                              handleSaved={handleSaved}
                              dir={dir}
                            />
                          ) : isImage(tab.id) ? (
                            <Image file={tab} />
                          ) : tab.id.endsWith(".pdf") ? (
                            <PDF file={tab} />
                          ) : tab.id.includes(".pcol") ? (
                            <Collection
                              file={tab}
                              dir={dir}
                              tabIndex={index}
                              handleChanged={handleChanged}
                              handleSaved={handleSaved}
                              unsaved={changed[index]}
                              setTabs={setTabs}
                              allTabs={allTabs}
                              tabGroupIndex={tabGroupIndex}
                              refresh={refresh}
                              updateTab={updateTab}
                            />
                          ) : tab.id.includes(".pas") ? (
                            <Asset
                              file={tab}
                              dir={dir}
                              tabIndex={index}
                              handleChanged={handleChanged}
                              handleSaved={handleSaved}
                              unsaved={changed[index]}
                              setTabs={setTabs}
                              allTabs={allTabs}
                              tabGroupIndex={tabGroupIndex}
                              refresh={refresh}
                              updateTab={updateTab}
                            />
                          ) : null}
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
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full">
          <Welcome handleOpenDirectory={handleOpenDirectory} />
        </div>
      )}
    </>
  );
};
