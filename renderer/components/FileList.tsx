import path from "path";
import { Dropdown } from "./Dropdown";
import { FileName } from "./FileName";
import { CollectionCreateInput } from "./CollectionCreateInput";

export const FileList = ({
  refresh,
  filePaths,
  dir,
  handleNewTab,
  collectionCreateInput,
  collectionCreateInputToggle,
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
      const fullPath = path.join(currentPath, key);
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
              <li>
                {
                  <ul className="pl-3">
                    {renderTree(tree[directory], fullPath)}
                  </ul>
                }
              </li>
            </Dropdown>
          </li>
        );
      }),
      ...files.map((file) => {
        const fullPath = path.join(currentPath, file);
        return (
          <li
            key={fullPath}
            className="truncate rounded-md whitespace-nowrap scrollBarHide hover:cursor-pointer hover:bg-hlgreen p-1"
            onClick={() => {
              handleNewTab(fullPath);
            }}>
            <FileName text={path.basename(fullPath)} />
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
