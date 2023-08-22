import React from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { Tag } from '../App';

type EditTagsModalProps = {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

const EditTagsModal = ({ availableTags, handleClose, show, onUpdateTag, onDeleteTag }: EditTagsModalProps) => {
  return (
   <Modal show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title>Edit Tags</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Form>
         <Stack gap={2}>
           {availableTags.map(t => (
             <Row key={t.id}>
               <Col>
                 <Form.Control
                   value={t.label}
                   onChange={(e) => onUpdateTag(t.id, e.target.value)}
                 />
               </Col>
               <Col xs={'auto'}>
                 <Button
                   variant={'outline-danger'}
                   onClick={() => onDeleteTag(t.id)}
                 >
                   &times;
                 </Button>
               </Col>
             </Row>
           ))}
         </Stack>
       </Form>
     </Modal.Body>
   </Modal>
  );
};

export default EditTagsModal;