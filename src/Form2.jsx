import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const Form2 = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate();
    const handleSubmit=(e)=> {
        e.preventDefault()
        axios.post('http://localhost:3001',{ email, password} )
        .then(result=>{
            console.log(result)
           if(result.data==="success")  
            {

             navigate('/')

            }
        
        
        
        })
        .catch(err=>console.log(err))
         
    
      }
  return (
    <div>
      <form  className="flex justify-center items-center mt-20" onSubmit={handleSubmit}>
      <div  className="flex flex-col h-[500px] w-[400px] items-center justify-center  bg-yellow-600 rounded-[15px] shadow-[10px_10px_#000]">
       
      <div className="mt-4">
<label  className="text-[21px] text-black font-[600]" htmlFor="name">Email</label>
      <input  className="h-[27px]  ml-4 w-[200px] rounded-[10px] px-[15px]"
      type="text"
      placeholder="Enter Email"
      name="email"
      onChange={(e)=>setEmail(e.target.value)}      
      ></input> 
</div>
    <div className="mt-4">
<label  className="text-[21px] text-black font-[600]" htmlFor="name">Password</label>
      <input  className="h-[27px]  ml-4 w-[200px] rounded-[10px] px-[15px]"
      type="password"
      placeholder="Enter Password"
      name="password"
      onChange={(e)=>setPassword(e.target.value)}      
      ></input> 
     </div> 
       
     <button className="h-[30px] mt-5 font-[700] w-[100px] p-5 bg-cyan-500 rounded-[10px] flex justify-center items-center" type="submit">Submit</button>       
       
       
       </div>        
        

        
        </form>   
      
    </div>
  )
}

export default Form2

