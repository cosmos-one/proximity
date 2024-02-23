import path from "path";
import { Dropdown } from "./Dropdown";
import { FileIcon } from "./FileIcon";
import { FileName } from "./FileName";
import { CollectionCreateInput } from "./CollectionCreateInput";

export const FileList = ({
  refresh,
  filePaths,
  dir,
  handleNewTab,
  collectionCreateInput = undefined,
  collectionCreateInputToggle = undefined,
}) => {
  const directoryTree = filePaths.reduce((tree, filePath) => {
    const parts = filePath.split(path.sep);
    let node = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node[part]) {
        node[part] = {};
      }
      node = node[part];
    }

    return tree;
  }, {});

  const renderTree = (tree, currentPath = "") => {
    const directories = [];
    const files = [];

    Object.keys(tree).forEach((key) => {
      const isDirectory = Object.keys(tree[key]).length > 0;

      if (isDirectory) {
        directories.push(key);
      } else {
        files.push(key);
      }
    });

    directories.sort();
    files.sort();

    return [
      ...directories.map((directory) => {
        const fullPath = path.join(currentPath, directory);
        return (
          <li
            key={fullPath}
            className="truncate rounded-md whitespace-nowrap scrollBarHide hover:cursor-pointer">
            <Dropdown title={fullPath} titleBold={false}>
              <li>{renderTree(tree[directory], fullPath)}</li>
            </Dropdown>
          </li>
        );
      }),
      ...files.map((file) => {
        const fullPath = path.join(currentPath, file);
        return (
          <li
            key={fullPath}
            className="rounded-md whitespace-nowrap scrollBarHide hover:cursor-pointer hover:bg-hlgreen w-full flex items-center space-x-1"
            onClick={() => {
              handleNewTab(fullPath);
            }}>
            <div>
              <FileIcon fileType={path.extname(fullPath)} />
            </div>
            <div className="truncate">
              <FileName text={path.basename(fullPath)} />
            </div>
          </li>
        );
      }),
    ];
  };

  return (
    <ul>
      {collectionCreateInput ? (
        <CollectionCreateInput
          toggle={() => {
            collectionCreateInputToggle();
          }}
          dir={dir}
          refresh={refresh}
        />
      ) : null}
      {renderTree(directoryTree)}
    </ul>
  );
};
