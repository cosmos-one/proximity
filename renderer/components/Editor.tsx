import { useEffect, useState } from "react";
import { micromark } from "micromark";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface EditorProps {
  file: { title: string; content: string };
  index: number;
  handleChanged: (index: number) => void;
  handleSaved: (index: number) => void;
  dir: string;
}

export const Editor = ({
  file,
  index,
  handleChanged,
  handleSaved,
  dir,
}: EditorProps) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const newContent = findTag(micromark(file.content))
    setContent(newContent);
  }, [file]);

  const findTag = (content) => {
    const newContent = content.replace(
      /(^|\s)(#\w+)\b/g,
      `$1<span class="bg-hlgreen rounded-md px-1">$2</span> `
    );
    return newContent
  }

  const handleInput = (e: ContentEditableEvent) => {
    const editedContent = findTag(e.target.value);
    setContent(editedContent);
  };

  return (
    <div
      className="p-2 h-full w-full overflow-hidden opacity-90 border border-lightgreen rounded-md"
      tabIndex={0}>
      <div className="flex justify-center w-full h-full overflow-y-auto customScroll min-w-[300px] p-5">
        <div className="space-y-5 max-w-[600px]">
          <ContentEditable
            className="text-base text-green focus:outline-none prose-none prose-li:list-outside prose-li:ml-5 prose-h1:text-4xl prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:whitespace-normal"
            html={content}
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  );
};
