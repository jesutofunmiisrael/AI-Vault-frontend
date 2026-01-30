import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {yupResolver} from  "@hookform/resolvers/yup"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./signup.css"
import { Link } from 'react-router-dom';


const SignupSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});


const Signup = () => {
  const navigate = useNavigate()

const [showpassword, setshowpassword] = useState(false)
const [loading, setloading] = useState(false);

const { register, handleSubmit, formState: {errors} } = 
useForm({
  resolver:yupResolver(SignupSchema),
  defaultValues:{
    name: "",
    email: "",
    password:""
  }
})

const onSubmit = async(data)=>{
  setloading(true);
  try {
    const res = await fetch(`https://ai-vault-backend-diiu.onrender.com/api/auth/signup`,{
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
        body:JSON.stringify(data)
    })
    const result = await res.json()

    if(!result.success){
       throw new Error(result.message || "failed to sign up")
    }
   if(res.status === 201){
        toast.success("SIGNUP SUCCESSFULLY!  ✅ ");
  navigate('/login')
      }
      
  } catch (error) {
    console.log(error);
    
  }finally{
    setloading(false);
}
}

  return (
    <>

    <style>{`
      .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 4px;
        }
    
    `
      

      
      }
      
      
    </style>
<>
 <div className="auth-page">
  <div className="auth-container">
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
  <Link to = "/"><p className='home-back'>Back to home</p></Link>
      <h2 className="logo">🔥 AI Vault</h2>

      <h1>Create Account</h1>
      <p className="subtitle">Sign up to get started</p>

      <div className="input-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          {...register("name")}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type={showpassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
        />

        <span
          className="toggle-password"
          onClick={() => setshowpassword(p => !p)}
        >
          {showpassword ? "Hide" : "Show"}
        </span>

        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      <button type="submit"   disabled = {loading}> 
        {loading ? "Creating..." : "Sign Up"}
      </button>

   <Link to="/login">   <p className="login-text">
        Already have an account? <span>Login</span>
      </p></Link>
    </form>
  </div>
</div>

</>

    </>
  )
}

export default Signup

