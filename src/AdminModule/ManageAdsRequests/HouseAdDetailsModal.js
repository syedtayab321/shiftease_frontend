import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const HouseModal = ({ show, onHide, ad }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>House Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ad && (
          <>
            <p><strong>ID:</strong> {ad.id}</p>
            <p><strong>Owner Name:</strong> {ad.ownerName}</p>
            <p><strong>Price:</strong> {ad.price}</p>
            <p><strong>Location:</strong> {ad.address}</p>
            <p><strong>Description:</strong> {ad.houseDescription}</p>
            <p><strong>Email:</strong> {ad.ownerEmail}</p>
            <p><strong>Contact Number:</strong> {ad.ownerNumber}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HouseModal;
