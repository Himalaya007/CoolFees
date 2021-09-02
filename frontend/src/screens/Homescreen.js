import React,{useState,useEffect} from 'react'
import {Row,Col, Pagination} from 'react-bootstrap'
// import products from '../components/products'
import Product from '../components/Product'
import {useDispatch,useSelector} from 'react-redux'
import {listproducts} from '../actions/productactions'
import Loader from '../components/loader'
import Paginate from '../components/Paginate' 
import ProductCarousel from '../components/ProductCarousel'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'

const Homescreen = (props) => {

const keyword=props.match.params.keyword

const pageNumber=props.match.params.pageNumber||1

const dispatch=useDispatch()

const productlist=useSelector(state=>state.productlist) 
const {loading,error,products,page,pages} =productlist  

 useEffect(() => {
    dispatch(listproducts(keyword,pageNumber))
 },[dispatch,keyword,pageNumber])



    return (
        <div>
            <Helmet>
                <title>Welcome to ShopCart</title>
                <meta name='decription' content='We sell what you need!!'></meta>
            </Helmet>
            {!keyword?<ProductCarousel/>:(
                <Link to='/' className='btn btn-light'>Go Back</Link>
            )}
            <h1>Latest products</h1>
            {loading?<h1><Loader /></h1>:error?<h1>{error}</h1>:(
           <>
             <Row>
             {products.map((product)=>(
                 <Col sm={6} md={4} lg={4} xl={3}>
                  <Product product={product} />
                 </Col>
             ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword?keyword:''}></Paginate>
          </>
            )}
            
        </div>
    )
}

export default Homescreen
