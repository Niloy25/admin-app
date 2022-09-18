import React from "react";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col } from "react-bootstrap"


const AddCategoryModal = (props) => {
    const { show, handleClose, onSubmit, modalTitle, size, categoryName, setCategoryName, parentCategoryId, setParentCategoryId, type, setType, categoryList, handleCategoryImage } = props;
    console.log(type);
    const optionList = [{name:'Store', value: 'Store'}, {name:'Product', value: 'Product'}, {name: 'Page', value: 'Page'}]
    return (
        <Modal show={show} handleClose={handleClose} onSubmit={onSubmit} modalTitle={modalTitle} size={size}>
            <Row>
                <Col>
                    <Input
                        label='Category Name'
                        placeholder='Category Name'
                        value={categoryName}
                        type='text'
                        onChange={(e) => setCategoryName(e.target.value)}
                        className='form-control-sm'
                    />
                </Col>
                <Col>
                    <Input
                        type='select'
                        label='Select Parent Category'
                        placeholder='Select Parent Category'
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        options={categoryList}
                    />
                </Col>
                <Col>
                    <Input
                        type='select'
                        label='Type'
                        placeholder='Select Type'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        options={optionList}
                        />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type='file' className='my-1 form-control-sm' name='categoryImage' onChange={handleCategoryImage} />
                </Col>
            </Row>
        </Modal>
    )
}

export default AddCategoryModal;