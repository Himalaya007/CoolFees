
import bcrypt from 'bcryptjs'

const Users=[
{
name:'Admin User',
email:'admin@example.com',
password:bcrypt.hashSync('123456',10),
isAdmin:true

},
{
    name:'sohan',
    email:'sohan@example.com',
    password:bcrypt.hashSync('123456',10),
  
    
    },
    {
        name:'ketan',
        email:'ketan@example.com',
        password:bcrypt.hashSync('123456',10),
        
        
     },



]

export default Users