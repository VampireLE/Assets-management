import { useNavigate } from "react-router-dom";
import LoginPage from "./../../assets/LoginPage.png"
import "./Auth.css"
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { persistor } from "../../app/store";

export default function Auth() {
    const [credation, setCredation] = useState({});
    const navigate = useNavigate();
    const [alertError, setAlertError] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (e) => {
      setCredation(e)
      mutate()
    }

    const { mutate, data, isSuccess, isError} = useMutation({
      mutationKey: ["user"],
      mutationFn:   async () => {
        const res = await fetch('http://localhost:3000/', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
          },
          body: JSON.stringify({email: credation.email, password: credation.password})
        })
        return res.json()
      }
    })

    useEffect(() => {
      console.log(alertError)
      if (data?.error) {
        setAlertError(data.error)

        const timeout = setTimeout(() => {
          setAlertError(null)
        }, 10000)


        return () => clearTimeout(timeout);
      }      
    }, [data?.error])
    
    if (isSuccess) {
      localStorage.setItem("token", data.body)
      // navigate('/assets')
    } 

    return (
    <>
      <div className="section">
        <div className="section__wrapper">

          <div className="section__img">
            <img src={LoginPage} alt="Login Page" />
          </div>

          <div className="login">

            <div className="login__welcome">
              <p className="login__welcome-text">
                Welcome to <br />
                <span className="login__welcome-span">Assets Management</span>
              </p>
            </div>

            <div className="login__integrations">
              <button className="button login__integration login__integration-google">
                <img src="/assets/images/google.png" alt="Google" />
                Login with Google
              </button>
              <button className="button login__integration login__integration-keycloak">
                <img src="/assets/images/keycloak.png" alt="Keycloak" />
                Login with Keycloak
              </button>
            </div>

            <div className="login__separator">OR</div>

            <div className="login__form-container">
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form__email"
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
                  className="form__password"
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: "Password is required",
                    maxLength: {value: 20, message: "Email cannot exceed 20 characters"},
                    maxLength: {value: 20, message: "Password cannot exceed 20 characters"},
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <div className="form__remember-me">
                  <input type="checkbox" id="remember-me" name="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <input className="form__btn-submit" type="submit" value="Login"  />
              </form>
            </div>


          </div>

          {alertError && <div className={`${alertError ? 'alert__error active': 'alert__error'}`}>{alertError}</div>}
        </div>
        </div>
    </>
  );
}