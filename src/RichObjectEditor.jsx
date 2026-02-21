import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichObjectEditor({ content, onSave }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content
  });

  return (
    <div>
      <EditorContent editor={editor} />
      <button onClick={() => onSave(editor.getJSON())}>
        Save
      </button>
    </div>
  );
}