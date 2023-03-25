
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';




function Buyproduct(props) {
  

    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                
            </Modal.Header>
            <Modal.Body>
              
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={props.onHide}>
            Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Buy() {
    const [modalShow, setModalShow] = React.useState(false);

    

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                BUY
            </Button>

            <Buyproduct
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}