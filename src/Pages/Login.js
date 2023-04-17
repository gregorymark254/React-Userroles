import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from '../api/api'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/login',
      JSON.stringify({email,password}),
      {
        headers: {'Content-Type' : 'application/json'},
        withCredential : true
      })
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      toast.success("Login Succesful")
      if (response?.data.roles === [2001]) {
        navigate('/homes')
      } else {
        navigate('/register')
      }
    } catch (error) {
      console.log(error.response)
      toast.error("Wrong username or password")
    }
  }

  return (
    <section className="h-screen">
       <ToastContainer />
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
              <h2>Login to your account! </h2>
            </div>
            <form onSubmit={handleSubmit}>
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
                  type="password"
                  className="block min-h-[auto] w-full rounded border border-black py-[0.32rem] px-3 leading-[2.15] "
                  placeholder="Password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                Sign in
              </button>

              <div className="mt-3">
                <span>Don't have an account? <a className="text-primary-600" href="/register"><u>Register Here</u></a></span>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

