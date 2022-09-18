import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Modal from '../../components/UI/Modal'
import Input from '../../components/UI/Input'
import { Row, Col } from 'react-bootstrap'
import linearCategories from '../../helpers/linearCategories'
import { useSelector, useDispatch } from 'react-redux'
import { createPage } from '../../actions'

function NewPAge() {

    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [createModal, setCreateModal] = useState(false)
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const category = useSelector(state => state.category)
    const page = useSelector(state => state.page)
    const dispatch = useDispatch()

    const handlePage = () => setCreateModal(true)

    const handlePageClose = () => setCreateModal(false)

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category])

    useEffect(() => {
        console.log(page);
        // if(page.loading){
        //     setCreateModal(false)
        // }
    }, [page])

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value === e.target.value)
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]])
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = () => {
        if (title === '') {
            setCreateModal(false)
        }
        else {
            const form = new FormData()
            form.append('title', title)
            form.append('description', desc)
            form.append('category', categoryId)
            form.append('type', type)
            banners.forEach(banner => form.append('banners', banner))
            products.forEach(product => form.append('products', product))
            console.log({ title, desc, categoryId, type, banners, products });
            dispatch(createPage(form))
            setTitle('')
            setDesc('')
            setCategoryId('')
            setType('')
            setBanners([])
            setProducts([])
            setCreateModal(false)
        }
    }

    const renderCreatePageModal = () => {
        return (
            <Modal show={createModal} handleClose={handlePageClose} onSubmit={submitPageForm} modalTitle={'Create New Page'}>
                <Row>
                    <Col>
                        <Input
                            label='Page Title'
                            placeholder='Page Title'
                            value={title}
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            className='form-control-sm'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type='select'
                            label='Select Category'
                            placeholder='Select Category'
                            value={categoryId}
                            onChange={onCategoryChange}
                            options={categories}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label='Describtion'
                            placeholder='Describtion'
                            value={desc}
                            type='text'
                            onChange={(e) => setDesc(e.target.value)}
                            className='from-control form-control-sm'
                        />
                    </Col>
                </Row>
                <Row className='d-flex'>
                    <Col>
                        <label htmlFor='banner' className='from-control'>Banner</label>
                        <input type="file" className='form-control-sm' name='banners' id='banner' onChange={handleBannerImages} />
                    </Col>
                    <Row className='mx-2'>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) =>
                                    <Col key={index}>{banner.name}</Col>
                                ) : null
                        }
                    </Row>
                </Row>
                <Row className='d-flex'>
                    <Col>
                        <label htmlFor='product' className='from-control my-2'>Product</label>
                        <input type="file" className='form-control-sm' name='products' id='product' onChange={handleProductImages} />
                    </Col>
                    <Row className='mx-2'>
                        {
                            products.length > 0 ?
                                products.map((product, index) =>
                                    <Col key={index}>{product.name}</Col>
                                ) : null
                        }
                    </Row>
                </Row>

            </Modal>
        )
    }

    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>Creating Page...please wait</p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <button className='btn btn-primary btn-sm shadow-none' onClick={handlePage}>Create Page</button>
                    </>
            }
        </Layout>
    )
}

export default NewPAge