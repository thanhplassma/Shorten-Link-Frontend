import "./style.css";
import {useEffect, useState} from "react";
import effect from "./effect";
import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import fetchJson from "../../Util/fetchJson";

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
	message: PropTypes.func.isRequired,
	onFormSwitch: PropTypes.func.isRequired
};

function Login(props)
{
	useEffect(() => {return effect();});

	const[inputs, setInputs] = useState({
		username: "",
		password: ""
	});

	const[loading, setLoading] = useState(false);
	const[errors, setErrors] = useState(null);

	const handleSubmit = (event) =>
	{
		event.preventDefault();
		async function handleFetch()
		{
			setLoading(true);
			let request = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(inputs)
			};
			await fetchJson("http://localhost:5000/api/users/login", request).then((res) =>
			{
				setLoading(false);
				if(res.status === "success")
				{
					props.setToken(res.data);
				}
				else if(res.status === "error")
				{
					setErrors(res.message);
				}
			});
		}
		handleFetch().then(() => {});
	};

	const handleChange = (event) =>
	{
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => {return {...values, [name]: value};});
	};

	if(loading)
	{
		return  <div ><div className="load"></div> Loading </div>;
	}

	return (
		<form onSubmit={handleSubmit}>
			<embed type="" src="/images/kylin.svg"/>
			<h2 className="title">Welcome</h2>
			<p className="messages">{props.message}</p>
			<div className="input-div one">
				<div className="i">
					<i className="fas fa-user"></i>
				</div>
				<div className="div">
					<h5>Username</h5>
					<input autoComplete="true" type="text" className="input" name="username" value={inputs.username} onChange={handleChange}/>
				</div>
			</div>
			<div className="input-div pass">
				<div className="i">
					<i className="fas fa-lock"></i>
				</div>
				<div className="div">
					<h5>Password</h5>
					<input autoComplete="true" type="password" className="input" name="password" value={inputs.password} onChange={handleChange}/>
				</div>
			</div>
			<Link to="">Forgot password</Link>
			<Link to={""} onClick={() => {return props.onFormSwitch("Register");}}>Sign up</Link>
			<input type="submit" className="btn" value="Login"/>
			<p className="messages">{errors}</p>
		</form>
	);
}

export default Login;
