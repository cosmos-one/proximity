import { useEffect, useRef, useState, createElement, Fragment } from "react";
import { micromark } from "micromark";
import { ipcRenderer } from "electron";

interface EditorProps {
  file: { title: string; content: string };
  index: number;
  handleChanged: (index: number) => void;
  handleSaved: (index: number) => void;
  dir: string;
}

export const Editor = ({ file, index, handleChanged, handleSaved, dir }: EditorProps) => {
  const [inputs, setInputs] = useState<{ title?: string; body?: string }>();
  const [saving, setSaving] = useState<boolean>(false);
  const [content, setContent] = useState<string>();

  useEffect(() => {
    setContent(micromark(file.content));
    const object = {
      title: file.title,
      body: micromark(file.content),
    };
    setInputs(object);
  }, [file]);

  const handleInputs = (e: React.FormEvent<HTMLDivElement>, name: string) => {
    handleChanged(index);
    setInputs((prevState) => ({ ...prevState, [name]: e.currentTarget.innerHTML }));
  };

  // const handleHotkeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //     // Save markdown
  //     if (e.altKey && e.keyCode === 83) {
  //         // setSaving(true)
  //         ipcRenderer.send("recipe", {req: "POST", name: recipe.id.replace(/\.md$/, ''), path: currentDirectory, title: inputs.title, body: inputs.body})
  //         ipcRenderer.on("update-md", (e, message) => {
  //             updateRecipe(index, message)
  //             setSaving(false)
  //             handleSaved(index)
  //         })
  //     }
  // }

  return (
    <div
      className="p-2 h-full w-full overflow-hidden opacity-90 border border-lightgreen rounded-md"
      tabIndex={0}>
      <div className="flex justify-center w-full h-full overflow-y-auto customScroll min-w-[300px] p-5">
        <div className="space-y-5">
          <div>
            <div
              className="prose text-sm focus:outline-none leading-snug prose-hr:border-none prose-hr:my-1 text-green prose-headings:text-green prose-headings:text-2xl prose-p:mb-5 prose-a:text-green"
              contentEditable={true}
              dangerouslySetInnerHTML={{
                __html: content || "",
              }}
              onInput={(e) => {
                handleInputs(e, "body");
              }}></div>
          </div>
          {saving ? (
            <div className="absolute right-10 top-5 bg-pink-700 rounded p-2 animate-pulse">
              Saving
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};