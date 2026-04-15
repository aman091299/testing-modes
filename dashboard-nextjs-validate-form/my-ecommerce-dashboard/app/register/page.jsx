"use client";

import { useState } from "react";
const init = { firstName: "", lastName: "", email: "", password: "", age: "" };

const Register = () => {
  const [form, setForm] = useState(init);
  const [error, setError] = useState("");

  const validateForm = () => {
    console.log("form firstName",form.firstName)
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    if (
      !form.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    )
      return "Invalid Email";
          
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/).test(form.password)){
   return "Password must contain uppercase, lowercase, number, special character and be at least 6 characters long";
    }
     if (!form.age || isNaN(form.age) || form.age <= 0) return "Invalid age";
         return null;
  };

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent page reload
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

      // Send to backend
    // try {
    //   const res = await fetch("http://localhost:7000/users", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });

    //   const data = await res.json();
    //   if (!res.ok) {
    //     setError(data.message || "Failed to create user");
    //   } else {
    //     alert("User created successfully!");
    //     setForm(init); // reset form
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setError("Server error");
    // }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="register" onSubmit={handleRegister}>
      <input type="text" name="firstName" placeholder="first name" onChange={handleChange} />
      <input type="text"  name="lastName" placeholder="last name" onChange={handleChange} />
      <input
        type="email"
         name="email"
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input type="password" name="password" placeholder="password" onChange={handleChange} />
      <input type="number" name="age" placeholder="age" onChange={handleChange} />
      <button>submit</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Register;
