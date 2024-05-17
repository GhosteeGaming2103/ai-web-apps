"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Note } from "@/interfaces/note";
const NoteModal = ({
  getNotes,
  note,
  mode,
}: {
  note: Note;
  mode: string;
  getNotes: () => Promise<void>;
}) => {
  const [characterCount, setCharacterCount] = useState(250);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    if (val.length > 250) {
      return;
    }
    setCharacterCount(val.length);
    setNoteContent(val);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!session?.user?.id) return;
    let noteId = note.id;
    switch (mode) {
      case "edit":
        const putResult = await axios.put("/api/notes", {
          noteid: noteId,
          title: noteTitle,
          content: noteContent,
          userid: 10,
        });
        if (putResult.status === 200) {
          console.log(putResult.data);
          getNotes();
        }
        break;
      case "new":
        const result = await axios.post("/api/notes", {
          title: noteTitle,
          content: noteContent,
          userid: session?.user?.id,
        });
        if (result.status === 200) {
          console.log(result.data);
          getNotes();
        }
        break;
    }
    setLoading(false);
    (document.getElementById(`note_modal`) as HTMLDialogElement).close();
  };

  const handleEnhance = async () => {
    setLoading(true);
    if (noteContent === "") return;
    const result = await axios.post("/api/notes/enhance", {
      content: noteContent,
    });
    if (result.status === 200) {
      setNoteContent(result.data);
      setLoading(false);
      setCharacterCount(result.data.length);
    }
  };

  useEffect(() => {

    setNoteTitle(note.title);
    setNoteContent(note.content);
    if (note.content) {
      setCharacterCount(note.content.length);
    } else {
      setCharacterCount(0);
    }
    console.log("NOTE: ", noteContent);
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
        <div className="h-[175px]">
          {loading && (
            <div className="absolute flex items-center gap-5 text-black left-[240px] top-[140px]">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {!loading && (
            <textarea
              className="textarea textarea-outline h-fit bg-transparent text-black w-full overflow-hidden"
              placeholder="Enter Note"
              color="bg-blue-500"
              value={noteContent || ""}
              onChange={handleChange}
              rows={5}
              style={{ resize: "none" }} // Add this line to disable resizing
            ></textarea>
          )}
        </div>

        <div className="modal-action">
          <button
            onClick={handleEnhance}
            className="btn btn-primary"
            disabled={loading}
          >
            AI Enhance
          </button>
          <button
            className="btn btn-secondary text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            Save
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn"
              onClick={() => {
                setNoteTitle(note.title || "");
                setNoteContent(note.content || "");
              }}
            >
              Close
            </button>
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
