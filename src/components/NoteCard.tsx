import React from 'react';
import { SimplifiedNotes } from './NoteList';
import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/NoteList.module.css';
const NoteCard = ({id, title, tags}: SimplifiedNotes) => {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className={'align-items-center justify-content-center h-100'}>
          <span className={'fs-5'}>{title}</span>
          {!!tags.length && (
            <Stack gap={1} direction={'horizontal'} className={'justify-content-center flex-wrap'}>
              {tags.map(t => (
                <Badge key={t.id} className={'text-truncate'}>
                  {t.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;