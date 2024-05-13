"use client";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";
import { useState } from "react";
import { Note } from "@/interfaces/note";

const Notes = () => {
  const [mode, setMode] = useState<"new" | "edit">("new");
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
      setMode("edit");
      setNote(note);
    } else {
      setMode("new");
      setNote(newNote);
    }
    (document.getElementById(`note_modal`) as HTMLDialogElement).showModal();
  };
  const notes = [
    {
      id: 1,
      title: "Note 1",
      content:
        "sdfatsflksjflsdjfkasfjsalkjfasklfjasl;fasjfkldajfal;fasdfl;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;k;kkkfkjas;lkfjasd;lkfjas;lfkjasf;lajsfals;kfjaslfjaslfkjasf;lkasjfal;sjfla;sjfa;slfkjadsfl;ajfas;lkfjas;lfajsf;alskjfa",
    },
    {
      id: 2,
      title: "Note 2",
      content: "This is the second note",
    },
  ];
  return (
    <>
      <h1 className="text-2xl text-center">Notes</h1>
      <div className="grid grid-cols-2 gap-4 m-3">
        {notes.map((note) => (
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
      <NoteModal note={note as Note} mode={mode} />
    </>
  );
};

export default Notes;
