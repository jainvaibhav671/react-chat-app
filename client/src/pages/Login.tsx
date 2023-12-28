import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../assets/react.svg'
import { loginRoute } from '../lib/api_routes'

const toastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
}

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/ ")
    }
  }, [navigate])

  const handleValidation = () => {
    
    const { password } = values
    if (password.length < 8) {
      toast.error('Password should be at least 8 characters', toastOptions)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { password, email } = values
    if (handleValidation()) {
      console.log(loginRoute)
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      })

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        navigate("/")
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img className="logo" src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <div>
            Dont't have an account? <Link to={'/register'}>Register</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}
