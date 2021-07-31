import React from "react";
import axios from "axios";
import UseForm from "../UseForm/UseForm";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

const Login = () => {
	const { values, handleChange, handleSubmit } = UseForm(login);
	const { setJwt, userHasAuthenticated } = useAppContext();
	const history = useHistory();

	//After login, take the user to home page and set token valeu in isAuthenticated variable from localStorage
	async function login() {
		await axios
			.post("http://localhost:5000/api/auth", values)
			.then((response) => {
				localStorage.setItem("token", response.data);
				userHasAuthenticated(true);
				setJwt(localStorage.getItem("token"));
				history.push("/home");
			})
			.catch((error) => {
				console.log(error);
				alert(error.response.data);
			});
	}

	return (
		<div className="container">
			<h1 className="login-title">User Login</h1>
			<form onSubmit={handleSubmit}>
				<span>Email</span>
				<input
					name="email"
					value={values.email || ""}
					onChange={handleChange}
				/>
				<span>Password</span>
				<input
					name="password"
					type="password"
					value={values.password || ""}
					onChange={handleChange}
				/>
				<button type="submit" className="btn btn-primary-success">
					Submit
				</button>
			</form>

			<Link to="/home">
				<button className="btn btn-dark">Back to Home </button>
			</Link>
		</div>
	);
};

export default Login;
