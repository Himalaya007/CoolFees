import axios from 'axios'


export const createorder=(order)=>async(dispatch,getState)=>{
    try{
     dispatch({
         type:'ORDER_CREATE_REQUEST'
     })

     const {userlogin:{userinfo}}=getState()
    const config={
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userinfo.token}`
    }
    //getstate gives userlogin state form which we need userinfo which stores token and other info.
    }
    const {data}=await axios.post(`/api/orders`,order,config)

    dispatch({
        type:'ORDER_CREATE_SUCCESS',
        payload:data
    })

  
    }catch(e){
        dispatch({
            type:'ORDER_CREATE_FAIL',
            payload:e.message
        })
    }
}


export const getorderdetails=(id)=>async(dispatch,getState)=>{
    try{
     dispatch({
         type:'ORDER_DETAILS_REQUEST'
     })

     const {userlogin:{userinfo}}=getState()
    const config={
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userinfo.token}`
    }
    //getstate gives userlogin state form which we need userinfo which stores token and other info.
    }
    const {data}=await axios.get(`/api/orders/${id}`,config)

    dispatch({
        type:'ORDER_DETAILS_SUCCESS',
        payload:data
    })

  
    }catch(e){
        dispatch({
            type:'ORDER_CREATE_FAIL',
            payload:e.message
        })
    }
}


export const payorder=(orderid,paymentresult)=>async(dispatch,getState)=>{
    try{
     dispatch({
         type:'ORDER_PAY_REQUEST'
     })

     const {userlogin:{userinfo}}=getState()
    const config={
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userinfo.token}`
    }
    //getstate gives userlogin state form which we need userinfo which stores token and other info.
    }
    const {data}=await axios.put(`/api/orders/${orderid}/pay`,paymentresult,config)

    dispatch({
        type:'ORDER_PAY_SUCCESS',
        payload:data
    })

  
    }catch(e){
        dispatch({
            type:'ORDER_PAY_FAIL',
            payload:e.message
        })
    }
}


export const myorderlist=()=>async(dispatch,getState)=>{
    try{
     dispatch({
         type:'ORDER_LIST_MY_REQUEST'
     })

     const {userlogin:{userinfo}}=getState()
    const config={
    headers:{
       
        Authorization:`Bearer ${userinfo.token}`
    }
    //getstate gives userlogin state form which we need userinfo which stores token and other info.
    }
    const {data}=await axios.get(`/api/orders/myorders`,config)

    dispatch({
        type:'ORDER_LIST_MY_SUCCESS',
        payload:data
    })

  
    }catch(e){
        dispatch({
            type:'ORDER_LIST_MY_FAIL',
            payload:e.message
        })
    }
}


export const allorders=()=>async(dispatch,getState)=>{
    try{
     dispatch({
         type:'ORDER_ALL_REQUEST'
     })

     const {userlogin:{userinfo}}=getState()
    const config={
    headers:{
       
        Authorization:`Bearer ${userinfo.token}`
    }
    //getstate gives userlogin state form which we need userinfo which stores token and other info.
    }
    const {data}=await axios.get(`/api/orders`,config)

    dispatch({
        type:'ORDER_ALL_SUCCESS',
        payload:data
    })

  
    }catch(e){
        dispatch({
            type:'ORDER_ALL_FAIL',
            payload:e.message
        })
    }
}


export const deliverorders=(id)=>async(dispatch,getState)=>{
    try{
     dispatch({
         type:'ORDER_DELIVER_REQUEST'
     })

     const {userlogin:{userinfo}}=getState()
    const config={
    headers:{
       
        Authorization:`Bearer ${userinfo.token}`
    }
    //getstate gives userlogin state form which we need userinfo which stores token and other info.
    }
    await axios.put(`/api/orders/${id}/deliver`,{},config)

    dispatch({
        type:'ORDER_DELIVER_SUCCESS',
    })

  
    }catch(e){
        dispatch({
            type:'ORDER_DELIVER_FAIL',
            payload:e.message
        })
    }
}