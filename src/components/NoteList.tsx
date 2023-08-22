import React, { useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Tag } from '../App';
import NoteCard from './NoteCard';
import EditTagsModal from '../modals/EditTagsModal';

export type SimplifiedNotes = {
  id: string;
  title: string;
  tags: Tag[];
}

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNotes[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

const NoteList = ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => (
      (!title.trim() || n.title.toLowerCase().includes(title.toLowerCase()))
      && (!selectedTags.length || selectedTags.every(t => n.tags.some(nt => nt.id === t.id)))
    ));
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className={'align-items-center mb-4'}>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs={'auto'}>
          <Stack gap={2} direction={'horizontal'}>
            <Link to='/new'>
              <Button variant={'primary'}>Create</Button>
            </Link>
            <Button
              variant={'outline-secondary'}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className={'mb-4'}>
          <Col>
            <Form.Group controlId={'title'}>
              <Form.Label>Title</Form.Label>
              <Form.Control type={'text'} value={title} onChange={e => setTitle(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={'tags'}>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                value={selectedTags.map(tag => ({ label: tag.label, value: tag.id, }))}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => ({ label: tag.label, id: tag.value })));
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className={'gap-3'}>
        {filteredNotes.map(n => (
          <Col key={n.id}>
            <NoteCard
              id={n.id}
              title={n.title}
              tags={n.tags}
            />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
};

export default NoteList;