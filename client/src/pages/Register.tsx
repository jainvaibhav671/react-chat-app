import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../assets/react.svg'
import { registerRoute } from '../lib/api_routes'

const toastOptions: ToastOptions = {
	position: 'bottom-right',
	autoClose: 8000,
	pauseOnHover: true,
	draggable: true,
	theme: 'dark',
}

export default function Register() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  }, [navigate])       

	const handleValidation = () => {
		
		const { password, confirmPassword, username } = values
		if (password !== confirmPassword) {
			toast.error('The passwords are different', toastOptions)
			return false
		} else if (username.length < 3) {
			toast.error('Username should be greater than 3 characters', toastOptions)
			return false
		} else if (password.length < 8) {
			toast.error('Password should be at least 8 characters', toastOptions)
			return false
		}
		return true
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const { password, username, email } = values
		if (handleValidation()) {
			const { data } = await axios.post(registerRoute, {
				username,
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
			<div className="register">
				<form onSubmit={handleSubmit}>
					<div className="brand">
						<img className="logo" src={Logo} alt="Logo" />
						<h1>Snappy</h1>
					</div>

					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={(e) => handleChange(e)}
					/>

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
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
					/>

					<button type="submit">Register</button>
					<div>
						Already have an account? <Link to={'/login'}>Login</Link>
					</div>
				</form>
			</div>
			<ToastContainer />
		</>
	)
}
