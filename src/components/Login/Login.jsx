import React from "react";
import axios from "axios";
import UseForm from "../UseForm/UseForm";

const Login = () => {
	const { values, handleChange, handleSubmit } = UseForm(login);

	async function login() {
		await axios
			.post("http://localhost:5000/api/auth", values)
			.then((response) => {
				localStorage.setItem("token", response.data);
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
					value={values.password || ""}
					onChange={handleChange}
				/>
				<button type="submit" className="btn btn-primary-success">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
