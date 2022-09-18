import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions';
import Layout from "../../components/Layout";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import { FaChevronRight, FaChevronDown, FaRegCheckSquare, FaCheckSquare, FaPlusCircle, FaTrash, FaRegEdit } from "react-icons/fa";
import UpdateCategoriesModel from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import './style.css';

function Category() {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [type, setType] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    const submitAddCategory = () => {
        if (categoryName === '') {
            setShow(false);
        }
        else {
            const form = new FormData();
            form.append('name', categoryName);
            form.append('parentId', parentCategoryId);
            form.append('categoryImage', categoryImage);
            form.append('type', type);
            dispatch(addCategory(form));
            setCategoryName('');
            setParentCategoryId('');
            setType('');
            setShow(false);
        }
    }

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId, type: category.type });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCategoryClose = () => setUpdateCategoryModal(false);

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach(categoryId => {
            const category = categories.find(category => categoryId === category.value);
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach(categoryId => {
            const category = categories.find(category => categoryId === category.value);
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        // console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const submitUpdateCategory = () => {
        if (expandedArray.length === 0 && checkedArray.length === 0) {
            setUpdateCategoryModal(false);
        }
        else {
            const form = new FormData();
            expandedArray.forEach(item => {
                form.append('_id', item.value);
                form.append('name', item.name);
                form.append('type', item.type);
                form.append('parentId', item.parentId ? item.parentId : "");
            });
            checkedArray.forEach(item => {
                form.append('_id', item.value);
                form.append('name', item.name);
                form.append('type', item.type);
                form.append('parentId', item.parentId ? item.parentId : "");
            });
            dispatch(updateCategories(form))
            setUpdateCategoryModal(false);
        }
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        }
        else if (type === 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map(item => ({ _id: item.value }));
        if (checkedIdArray.length === 0) {
            deleteCategoryClose()
        }
        if (checkedIdArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdArray))
            deleteCategoryClose()
        }
    }

    const deleteCategoryClose = () => setDeleteCategoryModal(false);

    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 className='mx-5'>Category</h4>
                            <div className='d-flex'>
                                <h5 className='mx-2 text-center mt-3'>Actions:</h5>
                                <div>
                                    <button className='btn btn-primary shadow-none' onClick={handleShow}><FaPlusCircle /><span> Add</span></button>
                                    <button className='m-2 btn btn-success shadow-none' onClick={updateCategory}><FaRegEdit /><span> Edit</span></button>
                                    <button className='btn btn-danger shadow-none' onClick={deleteCategory}><FaTrash /><span> Delete</span></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <FaCheckSquare />,
                                uncheck: <FaRegCheckSquare />,
                                halfCheck: <FaRegCheckSquare />,
                                expandClose: <FaChevronRight />,
                                expandOpen: <FaChevronDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal show={show} handleClose={handleClose} onSubmit={submitAddCategory} modalTitle={'Add New Category'} size={'lg'} categoryName={categoryName} setCategoryName={setCategoryName} parentCategoryId={parentCategoryId} setParentCategoryId={setParentCategoryId} type={type} setType={setType} categoryList={categoryList} handleCategoryImage={handleCategoryImage} />
            <UpdateCategoriesModel show={updateCategoryModal} handleClose={updateCategoryClose} onSubmit={submitUpdateCategory} modalTitle={'Update Category'} size={'lg'} expandedArray={expandedArray} checkedArray={checkedArray} handleCategoryInput={handleCategoryInput} categoryList={categoryList} />
            <DeleteCategoryModal show={deleteCategoryModal} handleClose={deleteCategoryClose} modalTitle='Confirm' buttons={[{ label: 'No', color: 'primary', onClick: deleteCategoryClose }, { label: 'Yes', color: 'danger', onClick: deleteCategories }]} checkedArray={checkedArray} />
        </Layout>
    )
}

export default Category
