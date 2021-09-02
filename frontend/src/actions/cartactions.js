import axios from 'axios'

export const addtocart=(id,qty)=>async(dispatch,getstate)=>{

const {data}=await axios.get(`/api/products/${id}`)

dispatch({type:'CART_ADD_ITEM',
payload:{
    product:data._id,
    name:data.name,
    image:data.image,
    price:data.price,
    countInStock:data.countInStock,
    qty
}
})

localStorage.setItem('cartitems',JSON.stringify(getstate().cart.cartitems))
}
export const removefromcart=(id)=>(dispatch,getstate)=>{

    
    
    dispatch({type:'CART_REMOVE_ITEM',
    payload:id
    })
    
    localStorage.setItem('cartitems',JSON.stringify(getstate().cart.cartitems))
    
    }

    export const saveshippingaddress=(data)=>(dispatch,getstate)=>{

    
    
        dispatch({type:'CART_SAVE_SHIPPING_DETAILS',
        payload:data
        })
        
        localStorage.setItem('shippingaddress',JSON.stringify(data))
        
        }

        export const savepaymentmethod=(data)=>(dispatch,getstate)=>{

    
    
            dispatch({type:'CART_SAVE_PAYMENT_METHOD',
            payload:data
            })
            
            localStorage.setItem('paymentmethod',JSON.stringify(data))
            
            }






