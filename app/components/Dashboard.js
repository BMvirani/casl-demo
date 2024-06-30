"use client";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Can } from "../providers/Can";
import { FaEdit } from "react-icons/fa";
const products = ["Refrigerator", "Washing machine"];

export default function Dashboard() {
  const [notes, setNotes] = useState(() => {
    const storedProducts = localStorage.getItem("notes");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const [newNote, notesetNewNote] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editedNote, setEditedNote] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDelete = (note) => {
    setNotes((prevNotesList) => {
      return prevNotesList.filter((currNote) => {
        return currNote !== note;
      });
    }); 
  };

  const handleAddProduct = () => {
    if (newNote.trim() !== "") {
      setNotes((prevNotesList) => [...prevNotesList, newNote]);
      notesetNewNote("");
     }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditedNote(note);
  };

  const handleSaveEdit = () => {
    setNotes((prevNotesList) =>
      prevNotesList.map((note) =>
        note === editingNote ? editedNote : note
      )
    );
    setEditingNote(null);
  };

  return (
    <>
        <Can I="create" a="notes" passThrough>
          {(allowed) => (
            <div className="add-note-box">
              <input
                type="text"
                value={newNote}
                onChange={(e) => notesetNewNote(e.target.value)}
                placeholder="Take a note.."
                className="add-note-field"
                disabled={!allowed}
              />
              <button onClick={handleAddProduct} className="add-note-btn">
              +
              </button>
            </div>
          )}
        </Can>

      <ul  className="note-list-ul">
        {notes.map((note) => {
          return (
            <li key={note} name={note} className="note-li">
              {editingNote === note ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                  />
                  <button onClick={handleSaveEdit} className="edit-save-btn">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="note-list-wrap">
                    <div className="note">{note}</div>
                    <div className="btn-wrap">
                      <Can I="delete" a="notes" passThrough>
                        {(allowed) => (
                          <FiTrash
                            className={`delete-btn ${
                              allowed ? "" : "delete-btn-dis"
                            }`}
                            onClick={() => {
                              if (allowed) {
                                handleDelete(note);
                              }
                            }}
                            color={allowed ? "black" : "#cdd5ef"}
                          />
                        )}
                      </Can>

                      <Can I="delete" a="notes" passThrough>
                        <Can I="update" a="notes" passThrough>
                          {(allowed) => (
                            <button
                              className="edit-btn"
                              disabled={!allowed}
                              onClick={() => handleEdit(note)}
                            >
                              <FaEdit />
                            </button>
                          )}
                        </Can>
                      </Can>
                    </div>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
