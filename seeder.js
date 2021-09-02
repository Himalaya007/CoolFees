import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/user.js'
import products from './data/products.js'
import User from './models/usermodel.js'
import Product from './models/productmodel.js'
import Order from './models/ordermodel.js'
import connect from './config/db.js'

dotenv.config()

connect()

const importdata=async()=>{
try{
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdusers=await User.insertMany(users)
    
    const Admin=createdusers[0]._id

    const sampleproducts=products.map(p=>{
        return{...p,user:Admin}
    })

    await Product.insertMany(sampleproducts)
    console.log('data imported!!')

}
catch(e){
console.log(e)

}

}
const destroydata=async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('data destroyed!!')
    
    }
    catch(e){
    console.log(e)
    
    }
    
    }


if(process.argv[2]==='-d'){
    destroydata()
}else{
    importdata()
}