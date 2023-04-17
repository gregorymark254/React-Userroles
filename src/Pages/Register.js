import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from '../api/api'

const Register = () => {

  const [firstName,setFirstname] = useState("")
  const [lastName,setLastname] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmpassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } 
    try {
      await axios.post('/api/v1/register',
      JSON.stringify({ firstName, lastName, email, phone, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      if (!error?.response) {
        toast.error("No Server Response");
      } else if (error.response?.status === 400) {
        toast.error("All fields are required");
      } else if (error.response?.status === 409) {
        toast.error("Email Taken");
      } else {
        toast.error("Registration Failed");
      }
      console.log(error);
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone " />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div className="text-center py-5 mb-4">
              <h2>Register your account! </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] b"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] b"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] b"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] b"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] "
                  placeholder="Password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] "
                  placeholder="Confirm Password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                Sign up
              </button>

              <div className="mt-3">
                <span>Already have an account? <a className="text-primary-600" href="/"><u>Login Here</u></a></span>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
