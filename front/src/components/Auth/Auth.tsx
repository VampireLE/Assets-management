import { useNavigate } from "react-router-dom";
import LoginPage from "./../../assets/LoginPage.png"
import "./Auth.css"
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Auth() {
    const [credation, setCredation] = useState({});
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (e) => {
      setCredation(e)
      mutate()
    }
    // navigate('/assets')
    const { mutate, data } = useMutation({
      mutationKey: ["user"],
      mutationFn:   async () => {
        await fetch('http://localhost:3000/', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
          },
          body: JSON.stringify({email: credation.email, password: credation.password})

        })
        // return await user.json()
      }
    })
    console.log(data)

    return (
    <>
      <div className="section">
        <div className="section__wrapper">
          <div className="img-login-page">
            <img src={LoginPage} alt="Login Page" />
          </div>
          <div className="container-login">
            <div>
              <p className="welcome-text">
                Welcome to <br />
                <span className="welcome-span">Assets Management</span>
              </p>
            </div>
            <div className="btns-integration">
              <button className="integration-google">
                <img src="/assets/images/google.png" alt="Google" />
                Login with Google
              </button>
              <button className="integration-keycloak">
                <img src="/assets/images/keycloak.png" alt="Keycloak" />
                Login with Keycloak
              </button>
            </div>
            <div className="line-with-text">OR</div>
            <div className="login-container">
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-email"
                  type="email"
                  placeholder="Email"
                  {...register('email', {
                    required: "Email is required",
                    minLength: {value: 1, message: "Password must be more 1"},
                    maxLength: {value: 20, message: "Email cannot exceed 20 characters"}
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                  className="form-password"
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: "Password is required",
                    maxLength: {value: 20, message: "Email cannot exceed 20 characters"},
                    maxLength: {value: 20, message: "Password cannot exceed 20 characters"},
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <div className="remember-me">
                  <input type="checkbox" id="remember-me" name="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <input className="form-btn" type="submit" value="Login"  />
              </form>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}