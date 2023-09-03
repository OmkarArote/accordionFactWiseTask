'use client'
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface AlertModalProps {
  id: number;
  show: boolean;
  title: string;
  msg: string;
  onClose: () => void;
  onYes: (id: number) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ id, show, onClose, onYes, title, msg }) => {
  const handleYesClick = () => {
    onYes(id);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="outline-primary" onClick={handleYesClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
