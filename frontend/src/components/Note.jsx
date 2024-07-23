import React from 'react';
import '../styles/note.css';

export default function Note({ note, onDelete }) {
  const { id, title, content, created_at } = note;
  const formattedDate = new Date(created_at).toLocaleDateString('en-GB');
  return (
    <div className="note-container">
      <p className="note-title">{title}</p>
      <p className="note-content">{content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(id)}>
        Delete
      </button>
      <br />
    </div>
  );
}
