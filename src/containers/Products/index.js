import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';
import Modal from '../../components/UI/Modal';
import { generatePublicUrl } from '../../urlConfig'
import './style.css';

function Products() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModel, setProductDetailModel] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const submitProduct = () => {
        if (name === '') {
            setShow(false);
        }
        else {
            const form = new FormData();
            form.append('name', name);
            form.append('quantity', quantity);
            form.append('price', price);
            form.append('description', description);
            form.append('category', categoryId);

            for (let pic of productPictures) {
                form.append('productPicture', pic);
            }
            dispatch(addProduct(form));
            setName('')
            setQuantity('')
            setPrice('')
            setDescription('')
            setCategoryId('')
            setProductPictures([])
            setShow(false);
        }
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: '14px' }} responsive="sm">
                <thead>
                    <tr>
                        <th>Sn</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>
                                <tr onClick={() => showProductDetailsModel(product)} key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        )
    }

    const renderAddProductModel = () => {
        return (
            <Modal show={show} handleClose={handleClose} onSubmit={submitProduct} modalTitle={'Add New Product'}>
                <Input
                    lable='Product Name'
                    placeholder='Product Name'
                    value={name}
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    lable='Quantity'
                    placeholder='Quantity'
                    value={quantity}
                    type='number'
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    lable='Price'
                    placeholder='Price'
                    value={price}
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    lable='Description'
                    placeholder='Description'
                    value={description}
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type='select'
                    label='Select Category'
                    placeholder='Select Category'
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    options={createCategoryList(category.categories)}
                />
                <input type='file' className='my-1' name='productPicture' onChange={handleProductPictures} />
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
            </Modal>
        )
    }

    const handelCloseProductDetailModel = () => {
        setProductDetailModel(false);
    }

    const showProductDetailsModel = (product) => {
        setProductDetails(product);
        setProductDetailModel(true);
    }

    const renderProductDetailsModel = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal show={productDetailModel} handleClose={handelCloseProductDetailModel} onSubmit={handelCloseProductDetailModel} modalTitle={'Product Details'} size='lg'>
                <Row>
                    <Col md='6'>
                        <h5 className='key'>Name</h5>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md='6'>
                        <h5 className='key'>Price</h5>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <h5 className='key'>Quantity</h5>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md='6'>
                        <h5 className='key'>Category</h5>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <h5 className='key'>Description</h5>
                        <p className='value'>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className='key'>Product Pictures</h5>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPictures.map(picture =>
                                <div className='productImgContainer' key={picture._id}>
                                    <img src={generatePublicUrl(picture.img)} alt='' />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Products</h4>
                            <button className='btn btn-primary shadow-none' onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModel()}
            {renderProductDetailsModel()}
        </Layout>
    )
}

export default Products
