"use client";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";
import { useEffect, useState } from "react";
import { Note } from "@/interfaces/note";
import { Plus } from "lucide-react";
import axios from "axios";

const Notes = () => {
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [notesArray, setNotesArray] = useState<Note[]>([]); // [{} as Note, {} as Note
  const [note, setNote] = useState<Note>({} as Note);
  const noteClickHandler = async (note: Note) => {
    console.log(`Id Clicked: ${note.id}`);
    let newNote: Note = {
      id: -1,
      title: "",
      content: "",
      userid: -1,
    };
    if (note.id > 0) {
      console.log("Edit Mode", note);
      setMode("edit");
      setNote(note);
    } else {
      setMode("new");
      setNote(newNote);
    }
    (document.getElementById(`note_modal`) as HTMLDialogElement).showModal();
  };
  const fetchNotes = async () => {
    const response = await axios.post("/api/notes", {
      userid: 1,
      mode: "get",
    });
    if (response.status === 200) {
      setNotesArray(response.data.data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center">Notes</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-3">
          {notesArray.map((note) => (
            <NoteCard
              key={note.id}
              noteClick={() => {
                noteClickHandler(note as Note);
              }}
              id={note.id}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
        <NoteModal getNotes={fetchNotes} note={note as Note} mode={mode} />
      </div>

      <button
        className="btn btn-circle absolute bottom-[80px] right-10"
        onClick={() => {
          noteClickHandler({} as Note);
        }}
      >
        <Plus />
      </button>
    </>
  );
};

export default Notes;
