
import { useState } from "react";
import { registerUser } from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(formData)
      .then((res) => {

        alert("Registration successful");

        // redirect to login
        window.location.href = "/";

      })
      .catch((err) => {
        alert("Registration failed");
        console.log(err);
      });
  };

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Register</button>

      </form>

    </div>
  );
}

export default Register;

