import React, { useEffect, useState } from "react";
import path from "path";
import { ipcRenderer } from "electron";

export const Welcome = ({ handleOpenDirectory }) => {
  const [recentDirectories, setRecentDirectories] = useState([]);

  useEffect(() => {
    getRecentDirectories().then((result) => {
      setRecentDirectories(result);
    });
  }, []);
  const getRecentDirectories = async () => {
    const recentDirectories = await ipcRenderer.invoke(
      "get-recent-directories"
    );
    return recentDirectories;
  };

  return (
    <div className="shadow-inner flex h-full w-full justify-center items-center space-x-5">
      <div className="grid lg:grid-cols-2 w-3/4 h-3/4">
        <div className="space-y-5 p-5">
          <div className="text-lg">Recent</div>
          <div>
            {recentDirectories
              ? recentDirectories.map((project) => {
                  return (
                    <div
                      key={project}
                      className="space-x-5 hover:cursor-pointer hover:bg-hlgreen p-2 rounded-md flex w-full"
                      onClick={() => {
                        handleOpenDirectory(project);
                      }}>
                      <div className="font-black">
                        {project ? path.basename(project) : null}
                      </div>
                      <div className="truncate w-full">{project}</div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="space-y-5 p-5 overflow-y-auto customScroll">
          <div className="font-bold text-xl">Welcome to Proximity (Beta)</div>
          <div className="italic opacity-50">
            Release v.0.1.0 (22 Apr, 2023)
          </div>
          <div>
            Proximity is a tool for archiving, sharing and gathering around
            research and intelligence.
            <br />
            <br />
            This is a beta release of a desktop version of Proximity that phases
            out server side functionality. The intention of this is to allow
            you, the user, to own all of your data and to be able to use
            Proximity offline.
            <br />
            <br />
            Proximity is still a work in progress developed by a small team of
            two. As a result, you may encounter some glitches or issues while
            using the software. We kindly ask for your patience during this
            process.
            <br />
            <br />
            In the meantime, let us know if you have any feedback, run into
            problems, or want to contribute via contact@cosmosone.xyz.
            <br />
            <br />
            Thanks and we hope you enjoy Proximity.
          </div>
        </div>
      </div>
    </div>
  );
};
