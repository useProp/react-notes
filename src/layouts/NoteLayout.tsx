import React from 'react';
import { Note } from '../App';
import { Navigate, Outlet, useParams } from 'react-router-dom';

type NoteLayoutsProps = {
  notes: Note[]
}
const NoteLayout = ({ notes }: NoteLayoutsProps) => {
  const { id } = useParams();
  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <Navigate to={'/'} replace />
    );
  }

  return (
    <Outlet context={note}/>
  );
};

export default NoteLayout;