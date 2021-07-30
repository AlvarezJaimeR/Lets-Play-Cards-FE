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

	return <div></div>;
};

export default Login;
