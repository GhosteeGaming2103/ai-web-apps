"use client";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";
import { useEffect, useState } from "react";
import { Note } from "@/interfaces/note";
import { Plus } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { setActive } from "@/components/ui/bottomNavButtons";

const Notes = () => {
  const { data: session } = useSession();
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [notesArray, setNotesArray] = useState<Note[]>([]); // [{} as Note, {} as Note
  const [note, setNote] = useState<Note>({} as Note);

  const fetchNotes = async () => {
    try {
      if (session?.user?.id) {
        const response = await axios.post("/api/notes", {
          userid: session.user.id,
          mode: "get",
        });
        if (response.status === 200) {
          setNotesArray(response.data.data);
        }
      }
    } catch (e) {
      console.log("Error fetching Notes ", e);
    }
  };

  const noteClickHandler = (note: Note) => {
    try {
      if (note.id > 0) {
        setMode("edit");
        setNote(note);
      } else {
        setMode("new");
        setNote({
          id: -1,
          title: "",
          content: "",
          userid: -1,
        });
      }
      (document.getElementById(`note_modal`) as HTMLDialogElement).showModal();
    } catch (e) {
      console.log("Error Clicking Note", e);
    }
  };

  useEffect(() => {
    fetchNotes();
    setActive(window.location.href);
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
