"use client";
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
const NoteCard = ({
  noteClick,
  id,
  title,
  content,
}: {
  noteClick?: (id: number) => void;
  id: number;
  title: string;
  content: string;
}) => {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);
  const [characterCount, setCharacterCount] = useState(content.length);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const { data: session } = useSession();
  return (
    <div
      className="card bg-slate-200 text-primary-content max-h-1/4 cursor-pointer "
      onClick={() => {
        if (noteClick) noteClick(id);
      }}
    >
      <div className="card-body max-h-[250px] overflow-hidden">
        <h2 className="card-title">{title}</h2>
        <p className="text-wrap" style={{ overflowWrap: "break-word" }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
