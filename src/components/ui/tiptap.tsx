"use client";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        levels: [2, 3],
        HTMLAttributes: {
          class: "text-[20px]",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-center  border border-input border-l ring-offset-background text-gray-400 items-start w-full gap-3 font-medium text-[14px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    // content: "<p>Hello World! 🌎️</p>",
    content: `<h2 class="text-[20px]"><strong>Monir Hosasin Rabby</strong></h2><p></p><p><strong>I am Monir Hossain</strong></p>`,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
