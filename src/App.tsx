import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewNote from './components/NewNote';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 } from 'uuid';
import NoteList from './components/NoteList';
import NoteLayout from './layouts/NoteLayout';
import Note from './components/Note';
import EditNote from './components/EditNote';

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
}

export type Tag = {
  id: string;
  label: string;
}

type RawNote = {
  id: string;
} & RawNoteData;

type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: v4(), tagIds: tags.map(tag => tag.id) }];
    });
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(n => {
        if (n.id === id) {
          return { ...n, ...data, tagIds: tags.map(tag => tag.id) }
        }
        return n;
      })
    });
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(pn => pn.id !== id));
  }

  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag]);
  }

  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags => prevTags.map(t => {
      if (t.id === id) {
        return { ...t, label };
      }
      return t;
    }));
  }

  const onDeleteTag = (id: string) => {
    setTags(prevTags => prevTags.filter(t => t.id !== id))
  }

  return (
    <Container className={'my-4'}>
      <Routes>
        <Route path={'/'} element={
          <NoteList
            availableTags={tags}
            notes={notesWithTags}
            onDeleteTag={onDeleteTag}
            onUpdateTag={onUpdateTag}
          />
        } />
        <Route path={'/new'} element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={onAddTag}
            availableTags={tags}
          />
        } />
        <Route path={'/:id'} element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path={'edit'} element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          } />
        </Route>
        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Routes>
    </Container>
  );
}

export default App;
