import React from "react";
import Modal from "../../../components/UI/Modal";

const DeleteCategoryModal = (props) => {
    const { show, handleClose, modalTitle, buttons, checkedArray } = props
    return (
        <Modal show={show} handleClose={handleClose} modalTitle={modalTitle} buttons={buttons}>
            <h5>Delete Categories List</h5>
            {checkedArray.map((item, index) => <span key={index}>{item.name} &nbsp;</span>)}
        </Modal>
    )
}

export default DeleteCategoryModal;