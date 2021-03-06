import React,{useEffect,useState} from 'react';
import {getUniquePro} from '../../FrontEndAPIs/apiCore'
import { Row} from "react-bootstrap";
import  Card from './proCard'
import Comments from "./Comments";
import axios from "axios";
import {API} from "../../Config";
import Rating from "./Rating";
import {isValidated} from "../../validators";



const Product = (props) =>{

    //hold product state
    const [product,giveProduct] = useState({})
    // eslint-disable-next-line
    const [err,setError] = useState(false)
    const [CommentLists, setCommentLists] = useState(false)



    const productVariable = {
        productId: props.match.params.productid
    }

    const loadUniqueProduct = productId =>{

        //method to get one product using API
        getUniquePro(productId).then(data =>{
            if(data.err){
                setError(data.err)
            }else{
                giveProduct(data)
            }
        })

    }

    //grab the product id when the component did mounts
    useEffect(() =>{
        //product id from url
        const productId = props.match.params.productid
        loadUniqueProduct(productId)

        axios.post(`${API}/comments/getComments`,productVariable)
            .then(response => {
                if (response.data.success){
                    console.log(response.data.product)
                    setCommentLists(response.data.comments)
                }else{
                    alert('Failed to get comments')
                }
            })
        // eslint-disable-next-line
    },[])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div className="mt-3">
                    <h2 className="mb-1 ml-4"> {product && product.productName}</h2>
                    <Row>
                        <div  style={{margin:'auto'}}>
                            {
                                product &&  product.productDesc && <Card product={product}
                                                                         viewProductBtn={false}/>
                            }
                        </div>

                    </Row>

            {isValidated() && isValidated().user.userType === "user" && (
                    <div>
                        <Rating product productId={product._id} userId={localStorage.getItem('userId')} />
                    </div>
            )}

            <div>
                        <Comments CommentLists={CommentLists} postId={product._id} refreshFunction={updateComment}/>
                    </div>

        </div>

    );
}

export default Product;
