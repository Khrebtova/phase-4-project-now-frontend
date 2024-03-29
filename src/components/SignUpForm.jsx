import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendUrl, headers } from '../Global'
const SignUpForm = ({onLogin}) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    const defaultData = {
        "username": '',
        "password": '',
        "passwordConfirmation": '',
        "firstName": '',
        "lastName": '',
        "role": '',
    }
    const [newUser, setNewUser] = useState(defaultData)
    
    const handleChange = (e) => {
        let key = e.target.id
        let value = e.target.value
        let formData = {...newUser, [key]: value}
        console.log(formData)
        setNewUser(formData)}
    
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(backendUrl+'/signup', {
          method: "POST",
          headers,
          body: JSON.stringify({
            username: newUser.username,
            password: newUser.password,
            password_confirmation: newUser.passwordConfirmation,
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            role: newUser.role,
          }),
        }).then((r) => { 
          setIsLoading(false);          
          if (r.created) {
            r.json().then((user) => {
              // navigate('/')
              onLogin(user)});
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    
  return (
    <form onSubmit={handleSubmit}>
        <h2>Complete all fields to create an account</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={newUser.username}        
        onChange={handleChange}
        />      
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={newUser.password}       
          onChange={handleChange}
          autoComplete="current-password"
        />
      
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={newUser.passwordConfirmation}
          onChange={handleChange}        
          autoComplete="current-password"
        />
      
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={newUser.firstName}
          onChange={handleChange}
        />
      
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={newUser.lastName}
          onChange={handleChange}
        />
     
        <label htmlFor="role">Your Title</label>
        <input 
        type="text"         
          id="role"
          value={newUser.role}
          onChange={handleChange}      
        />
     
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>     
      
        {errors ? errors.map((err) => (<h2 key={err}>{err}</h2>)) : null}
        
        <h2> Already have an account? Please log In</h2>
        <button onClick={()=>navigate('/login')}>Login</button>
    </form>

  )
}

export default SignUpForm