export const cartreducer=(state={cartitems:[],shippingaddress:{}},action)=>{
switch(action.type){
case 'CART_ADD_ITEM':
const item=action.payload
const existitem=state.cartitems.find(x=>x.product===item.product)
if(existitem){
return{
    ...state,
    cartitems:state.cartitems.map(x=>x.product===existitem.product?item:x)
}

}
else{
    return {
        ...state,
        cartitems:[...state.cartitems,item]
    }
}
case 'CART_REMOVE_ITEM':
    return {
        ...state,
        cartitems:state.cartitems.filter(x=>x.product!==action.payload)
    }
    case 'CART_SAVE_SHIPPING_DETAILS':
        return {
            ...state,
            shippingaddress:action.payload
        }
        case 'CART_SAVE_PAYMENT_METHOD':
            return {
                ...state,
                paymentmethod:action.payload
            }
case 'CART_RESET_ITEM':
    return {cartitems:[]}

default:
    return state
    
}


}

