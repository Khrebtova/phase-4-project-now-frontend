import React, { useState } from 'react'

const SignUpForm = ({onLogin}) => {
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
    
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch('http://localhost:3001/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    
  return (
    <form onSubmit={handleSubmit}>
      
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
     
        <label htmlFor="role">Your role</label>
        <input 
        type="text"         
          id="role"
          value={newUser.role}
          onChange={handleChange}      
        />
     
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>     
      
        {errors.map((err) => (<h2 key={err}>{err}</h2>))}
      
    </form>

  )
}

export default SignUpForm