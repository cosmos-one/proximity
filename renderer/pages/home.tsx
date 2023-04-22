import React, { useEffect, useState } from "react";
import Head from "next/head";
import path from "path";
import fs from "fs";
import Split from "react-split-it";
import { ipcRenderer } from "electron";

//Components
import { Toaster } from "react-hot-toast";
import { Toolbar } from "@/components/Toolbar";
import { FilePanel } from "@/components/FilePanel";
import { Welcome } from "@/components/Welcome";
import { TabGroup } from "@/components/TabGroup";
import { Footer } from "@/components/Footer";
import { WindowBar } from "@/components/WindowBar";

function Home() {
  // Project
  const [dir, setDir] = useState("");
  const [files, setFiles] = useState([]);
  //Tool Panel
  const [activeTool, setActiveTool] = useState(0);
  const [panel, setPanel] = useState(true);
  //Tabs
  const [tabs, setTabs] = useState([[]]);
  const [activeTab, setActiveTab] = useState([]);
  const [activeTabGroup, setActiveTabGroup] = useState(0);

  const handleActiveTool = (tool: number) => {
    setActiveTool(tool);
  };

  const handlePanelToggle = () => {
    setPanel(!panel);
  };

  const handleOpenNewDirectory = () => {
    ipcRenderer
      .invoke("choose-directory")
      .then((message) => {
        if (message.dir) {
          ipcRenderer.invoke("add-recent-directory", message.dir);
          setDir(message.dir);
          let processedFiles = message.data.files.map((file) => {
            return file;
          });
          setFiles(processedFiles);
        }
        return;
      })
      .catch((error) => {
        console.error("Method call failed:", error);
      });
  };

  const handleOpenDirectory = async (project) => {
    setDir(project);
    ipcRenderer.invoke("open-directory", project).then((result) => {
      let processedFiles = result.files.map((file) => {
        return file;
      });
      setFiles(processedFiles);
    });
  };

  //Tab Functions
  const handleNewTabGroup = () => {
    const update = [...tabs];
    update.push([]);
    setTabs(update);
  };

  const handleActiveTabGroup = (index) => {
    setActiveTabGroup(index);
  };

  const handleNewTab = (data) => {
    if (tabs[activeTabGroup]) {
      if (tabs[activeTabGroup].filter((tab) => tab.id === data).length > 0) {
        return;
      } else {
        const update = [...tabs];
        if (data.includes(".md")) {
          const fullPath = path.join(dir, data)
            ipcRenderer.invoke("markdown", { req: "GET", path: fullPath })
            .then((res) => {
                update[activeTabGroup].push(res);
                setTabs(update);
                const updateActiveTab = activeTab;
                updateActiveTab[activeTabGroup] = update[activeTabGroup].length - 1;
                setActiveTab(updateActiveTab);
            })
        } else if (data.includes(".jpg")){
          const fullPath = path.join(dir, data)
          fs.readFile(fullPath, (err, res) => {
            if (err) throw err;
            update[activeTabGroup].push({id: data, data: res});
            setTabs(update);
            const updateActiveTab = activeTab;
            updateActiveTab[activeTabGroup] = update[activeTabGroup].length - 1;
            setActiveTab(updateActiveTab);
          });
          return;
        } else {
          return
        }
      }
    }
  };

  const handleCloseTab = (data) => {
    const update = [...tabs];
    update[activeTabGroup] = update[activeTabGroup].filter(
      (tab) => tab.id != data
    );
    if (update[activeTabGroup].length < 1) {
      update.splice(activeTabGroup, 1);
    }

    if (activeTab[activeTabGroup] > update[activeTabGroup]?.length - 1) {
      const updateActiveTab = [...activeTab];
      updateActiveTab[activeTabGroup] = update[activeTabGroup].length - 1;
      setActiveTab(updateActiveTab);
    }
    if (update.length < 1) {
      update.push([]);
    }
    setTabs(update);
  };

  const handleActiveTab = (tabIndex, tabGroupIndex) => {
    const updateActiveTab = [...activeTab];
    updateActiveTab[tabGroupIndex] = tabIndex;
    setActiveTab(updateActiveTab);
  };

  return (
    <div>
      <Head>
        <title>Proximity</title>
      </Head>
      <main className="h-screen max-h-screen flex flex-col overflow-hidden focus:outline-none">
        <Toaster position="top-center" reverseOrder={false} />
        <WindowBar dir={dir}/>
        <div className="h-full w-full flex overflow-hidden">
          <Toolbar
            handleActiveTool={handleActiveTool}
            activeTool={activeTool}
            handlePanelToggle={() => {
              handlePanelToggle();
            }}
          />
          <div className="h-full w-full overflow-hidden">
            <Split
              className="flex w-full h-full overflow-y-hidden"
              gutterAlign="center"
              sizes={[0.1, 0.7]}
              minSize={100}>
              {panel ? (
                <div className="h-full overflow-y-hidden">
                  <FilePanel
                    active={activeTool === 0}
                    dir={dir}
                    files={files}
                    handleOpenNewDirectory={handleOpenNewDirectory}
                    handleNewTab={handleNewTab}
                  />
                </div>
              ) : null}
              <Split
                className="flex w-full h-full pr-1"
                direction="horizontal"
                gutterSize={10}
                minSize={100}>
                {tabs?.map((group, index) => {
                  return (
                    <TabGroup
                    dir={dir}
                      active={index === activeTabGroup ? true : false}
                      key={index}
                      tabs={group}
                      index={index}
                      handleNewTab={handleNewTab}
                      handleCloseTab={handleCloseTab}
                      activeTab={activeTab[index]}
                      handleActiveTab={handleActiveTab}
                      handleNewTabGroup={handleNewTabGroup}
                      handleActiveTabGroup={handleActiveTabGroup}
                      handleOpenDirectory={handleOpenDirectory}
                    />
                  );
                })}
              </Split>
            </Split>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Home;
