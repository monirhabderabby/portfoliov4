import { Editor } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Italic,
  StrikethroughIcon,
  Underline,
} from "lucide-react";

interface ToolbarProps {
  content: string;
  editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ content, editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-input">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-slate-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-slate-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-slate-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-slate-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <StrikethroughIcon className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-slate-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
