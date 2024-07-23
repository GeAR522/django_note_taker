import * as React from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/home.css';

export default function Home() {
  const [notes, setNotes] = React.useState([]);
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');

  function getNotes() {
    console.log('getting');
    api
      .get('/api/notes/')
      .then((res) => setNotes(res.data))
      .catch((err) => alert(err));
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  function deleteNote(id) {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Note Deleted!');
        } else {
          alert('Failed to Delete Note!');
        }
      })
      .catch((err) => alert(err))
      .finally(() => getNotes());
  }

  function createNote(e) {
    e.preventDefault();

    api
      .post('/api/notes/', { content, title })
      .then((res) => {
        if (res.status === 201) {
          setContent('');
          setTitle('');
          alert('Note Created!');
        } else {
          alert('Failed to Create Note!');
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => getNotes());
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        {notes.length ? (
          notes.map((note) => {
            return <Note key={note.id} note={note} onDelete={deleteNote} />;
          })
        ) : (
          <p>No Notes yet created...</p>
        )}
      </div>
      <br />
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="Title">Title: </label>
        <br />
        <input
        value={title}
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="Content">Content: </label>
        <br />
        <input
        value={content}
          type="text"
          id="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="Create Note" />
      </form>
    </>
  );
}
