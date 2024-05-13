"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Note } from "@/interfaces/note";
const NoteModal = ({ note, mode }: { note: Note; mode: string }) => {
  const [characterCount, setCharacterCount] = useState(250);
  const [id, setId] = useState(note.id);
  const [noteTitle, setNoteTitle] = useState(note.title || "");
  const [noteContent, setNoteContent] = useState(note.content || "");

  const { data: session } = useSession();
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    if (val.length > 250) {
      return;
    }
    setCharacterCount(val.length);
    setNoteContent(val);
  };

  const handleSubmit = () => {
    console.log(session?.user.id);
    if (!session?.user?.id) return;
    switch (mode) {
      case "view":
        break;
      case "edit":
        axios.put("/api/notes", {
          id,
          title: noteTitle,
          content: noteContent,
          userid: session?.user?.id,
        });
        break;
    }
    // Perform the form data submission logic here
    // You can access the updated noteTitle and noteContent values from the state
  };

  useEffect(() => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    if (note.content.length > 0) {
      setCharacterCount(note.content.length);
    }
  }, [note]);
  return (
    <dialog id={`note_modal`} className="modal">
      <div className="modal-box bg-slate-300 h-fit">
        <input
          type="text"
          placeholder="Enter Title"
          className="input w-full bg-transparent font-bold text-2xl text-black"
          value={noteTitle || ""}
          onChange={(e) => {
            if (e.target.value.length > 35) return;
            setNoteTitle(e.target.value);
          }}
        />

        <textarea
          className="textarea textarea-outline h-fit bg-transparent text-black w-full overflow-hidden"
          placeholder="Enter Note"
          color="bg-blue-500"
          value={noteContent || ""}
          onChange={handleChange}
          rows={5}
          style={{ resize: "none" }} // Add this line to disable resizing
        ></textarea>
        <div className="modal-action">
          <button
            className="btn btn-secondary text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
        <div className="absolute bottom-4 text-black">
          {250 - characterCount} Characters Left
        </div>
      </div>
    </dialog>
  );
};

export default NoteModal;
