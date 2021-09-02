import mongoose from 'mongoose'


const orderSchema=mongoose.Schema({
User:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'User'
},
orderitems:[
    {
        name:{type:String,required:true},
        qty:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Product'  },
       
    }
],
shippingaddress:{
    address:{type:String,required:true},
    city:{type:String,required:true},
    postalcode:{type:String,required:true},
    country:{type:String,required:true},
},
paymentmethod:{
    type:String,
    required:true
 },
 paymentresult:{
  id:{},
  status:{},
  update_time:{},
  email_address:{}
 },
 taxprice:{
    type:Number,
    required:true,
    default:0
 },
 shippingprice:{
    type:Number,
    required:true,
    default:0
 },
 totalprice:{
    type:Number,
    required:true,
    default:0
 },
 ispaid:{
    type:Boolean,
    required:true,
    default:false
 },
 paidat:{
     type:Date
 },
 isdelivered:{
    type:Boolean,
    required:true,
    default:false
 },
 deliveredat:{
     type:Date
 }


},{
    timestamps:true
})

const Order=mongoose.model('Order',orderSchema)

export default Order