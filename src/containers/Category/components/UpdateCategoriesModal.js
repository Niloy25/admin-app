import React from "react";
import { Row, Col } from 'react-bootstrap';
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";

const UpdateCategoriesModel = (props) => {
    const { show, handleClose, onSubmit, modalTitle, size, expandedArray, checkedArray, handleCategoryInput, categoryList } = props;
    const optionList = [{ name: 'Store', value: 'Store' }, { name: 'Product', value: 'Product' }, { name: 'Page', value: 'Page' }]
    return (
        <Modal show={show} handleClose={handleClose} onSubmit={onSubmit} modalTitle={modalTitle} size={size}>
            <Row>
                <Col>
                    {expandedArray.length > 0 ? <h6>Expanded Category</h6> : <h6>Please Select Any Category For Update</h6>}
                </Col>
            </Row>
            {
                expandedArray.length > 0 && expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                label='Category Name'
                                placeholder='Category Name'
                                value={item.name}
                                type='text'
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                className='form-control-sm'
                            />
                        </Col>
                        <Col>
                            <Input
                                type='select'
                                label='Select Parent Category'
                                placeholder='Select Parent Category'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                options={categoryList}
                            />
                        </Col>
                        <Col>
                            <Input
                                type='select'
                                label='Type'
                                placeholder='Select Type'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                options={optionList}
                            />
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col>
                    {checkedArray.length > 0 ? <h6>Checked Category</h6> : null}
                </Col>
            </Row>
            {
                checkedArray.length > 0 && checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                label='Category Name'
                                placeholder='Category Name'
                                value={item.name}
                                type='text'
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                className='form-control-sm'
                            />
                        </Col>
                        <Col>
                            <Input
                                type='select'
                                label='Select Parent Category'
                                placeholder='Select Parent Category'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                options={categoryList}
                            />
                            {/* <label htmlFor='category'>Select Parent Category</label>
                            <select className='form-control form-control-sm' id='category' value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Select Parent Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select> */}
                        </Col>
                        <Col>
                            <Input
                                type='select'
                                label='Type'
                                placeholder='Select Type'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                options={optionList}
                            />
                            {/* <label htmlFor='type'>Type</label>
                            <select className='form-control form-control-sm' id='type' value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
                                <option>{item.type}</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select> */}
                        </Col>
                    </Row>
                )
            }
        </Modal>
    )
}

export default UpdateCategoriesModel;