import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardGroup } from 'react-bootstrap';
import { axiosInstance } from '../apis/config';


const ProductDetails = () => {

    const [product, setProduct] = useState(null);
    const params = useParams();

    useEffect(() => {
        axiosInstance.get(`/products/${params.id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [params.id]);


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='contanier'>
                <div className='row mt-5'>
                    <div className='d-flex flex-lg-row flex-md-column flex-sm-column  col-12'>

                        <div className='  col-lg-6 col-md-12 col-sm-12 '>
                            <div > <img  src={product.thumbnail} alt='' /></div>

                            <CardGroup className='mt-2'>
                                {product.images.map((imageUrl, index) => (
                                    <Card key={index} className='  me-1 ms-1'>
                                        <Card.Img  variant="top" src={imageUrl} alt={`Image ${index + 1}`} />
                                    </Card>
                                ))}
                            </CardGroup>


                        </div >
                        <div className='offset-1 title'>


                            <div className=' d-flex flex-column'>
                                <h1>{product.title}</h1>
                                <p>{product.description}</p>
                                
                                <hr className='mt-3 me-3'></hr>
                               
                                <hr className='mt-3 me-3'></hr>

                                <button > {product.stock !== 0}In stock</button>
                                <p>More Information</p>
                                <div>
                                    <button > {product.category}</button>
                                    <button > {product.brand}</button></div>
                            </div>
                            <hr className='mt-3 me-3'></hr>

                            <div className='d-flex flex-row'> {product.stock !== 0 ?
                                (<> <button > - 1 +</button>
                                    <p>Only <span  >{product.stock}</span>  left! Don't miss it</p> </>)
                                : (<p>Out of Stock</p>)
                            }
                            </div>


                            <div><button className='mt-1 '>Add to cart</button></div>
                            <hr className='mt-3 me-3'></hr>

                        </div>




                        <div>


                        </div>

                    </div>


                </div>
            </div>


        </>
    );
};

export default ProductDetails;

