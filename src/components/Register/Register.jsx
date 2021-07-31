import React, { useState, useEffect } from "react";
import axios from "axios";
import UseForm from "../UseForm/UseForm";

const Register = () => {
	const { errors, values, handleChange, handleSubmit } = UseForm(register);

	async function register() {
		console.log("register button!");
		const { confirmPassword, ...users } = values;
		console.log(values);

		await axios
			.post("http://localhost:5000/api/users/", users)
			.then((response) => {
				localStorage.setItem("token", response.headers["x-auth-token"]);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response.data);
			});
	}

	return (
		<div className="container">
			<h1 className="form-title">Registration</h1>
			<form onSubmit={handleSubmit}>
				<span>Username</span>
				<input
					value={values.userName || ""}
					onChange={handleChange}
					name="userName"
					type="text"
					id="userName"
					required={true}
				/>
				<span>Email</span>
				<input
					value={values.email || ""}
					onChange={handleChange}
					name="email"
					type="email"
					id="email"
					required={true}
				/>
				<span>Password</span>
				<input
					value={values.password || ""}
					onChange={handleChange}
					name="password"
					type="password"
					id="password"
					required={true}
				/>
				<p className="errors">
					{errors.password ? `${errors.password}` : null}
				</p>
				<span>Confirm Password</span>
				<input
					value={values.confirmPassword || ""}
					onChange={handleChange}
					name="confirmPassword"
					type="confirmPassword"
					id="confirmPassword"
					required={true}
				/>
				<p className="errors">
					{errors.confirmPassword ? `${errors.confirmPassword}` : null}
				</p>
				<div>
					<button type="submit" className="btn btn-outline-primary">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;