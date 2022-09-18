import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function NewModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false} size={props.size}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {   
                    props.buttons ? props.buttons.map((button, index) => 
                        <Button key={index} variant={button.color} onClick={button.onClick}>
                            {button.label}
                        </Button>
                    ):
                    <Button variant="primary" className='btn-sm' onClick={props.onSubmit}>
                        Save
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal
