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

  console.log(inputs)

  return (
    <div
      className="p-20 pt-6 h-full overflow-scroll customScroll overflow-x-hidden px-5 rounded opacity-90 shadow-inset"
      tabIndex={0}>
      <div className="flex justify-center">
        <div className="space-y-5 lg:w-1/2 min-w-[300px]">
          <div>
            <div
              className="prose focus:outline-none leading-snug prose-hr:border-none prose-hr:my-1 text-green prose-headings:text-green prose-p:mb-5"
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