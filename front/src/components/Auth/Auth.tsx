import { useNavigate } from "react-router-dom";
import LoginPage from "./../../assets/LoginPage.png"
import style from "./Auth.module.scss"
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
      mutationKey: ["users"],
      mutationFn:   async () => {
        const res = await fetch('http://localhost:3000/', {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: credation.email, password: credation.password})
        })
        if (res.status === 401) console.log(req.status)
        return res.json()
      }
    })

    useEffect(() => {

      // if (!isSuccess) console.log(!isSuccess);
      if (isError) console.log(isError)
      if (data?.body) {
        localStorage.setItem("token", data.body)
        navigate('/dashboard')
      }

    }, [isSuccess, data, navigate, isError])

    useEffect(() => {
      
      if (data?.error) {
        setAlertError(data.error)

        const timeout = setTimeout(() => {
          setAlertError(null)
        }, 10000)


        return () => clearTimeout(timeout);
      }      
    }, [data?.error])
    
    // if (isSuccess) {
    //   localStorage.setItem("token", data.body)
    //   navigate('/dashboard')
    // } 

    return (
    <>
      <div className={style.section}>
        <div className={style.section__wrapper}>

          <div className={style.section__img}>
            <img src={LoginPage} alt="Login Page" />
          </div>

          <div className={style.login}>

            <div className={style.login__welcome}>
              <p className={style['login__welcome-text']}>
                Welcome to <br />
                <span className={style['login__welcome-span']}>Assets Management</span>
              </p>
            </div>

            <div className={style.login__integrations}>
              <div className={`${style.button} ${style.login__integration} ${style['login__integration-google']}`}>
                <img src="/assets/images/google.png" alt="Google" />
                Login with Google
              </div>
              <div
                onClick={() => 
                  window.location.href =
                  "https://auth-test-test.yoonion.ru/realms/master/protocol/openid-connect/auth" +
                  "?client_id=test-postman" +
                  "&response_type=code" +
                  "&scope=openid" +
                  "&redirect_uri=http://localhost:5173/Dashboard"
                }
              className={`${style.button} ${style.login__integration} ${style['login__integration-keycloak']}`}>
                <img src="/assets/images/keycloak.png" alt="Keycloak" />
                Login with Keycloak
              </div>
            </div>

            <div className={style['login__separator']}>OR</div>

            <div className={style['login__form-container']}>
              
              <form className={style['login-form']} onSubmit={handleSubmit(onSubmit)}>
                <div className={style['form__container']}>
                  <input
                    className={style.form__email}
                    style={errors.email && {margin: '0'}}
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                      required: "Email is required",
                      minLength: {value: 1, message: "Password must be more 1"},
                      maxLength: {value: 20, message: "Email cannot exceed 20 characters"}
                    })}
                  />
                  {errors.email && <p className={style.form__error}>{errors.email.message}</p>}
                </div>
                <div className={style['form__container']}>
                  <input
                    className={style.form__password}
                    style={errors.password && {margin: '0'}}
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                      required: "Password is required",
                      maxLength: {value: 20, message: "Email cannot exceed 20 characters"},
                      maxLength: {value: 20, message: "Password cannot exceed 20 characters"},
                    })}
                  />
                  {errors.password && <p className={style.form__error}>{errors.password.message}</p>}
                  <div className={style['form__remember-me']}>
                    <input type="checkbox" id="remember-me" name="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                  </div>
                </div>
                {/* <input className="form__btn-submit" type="submit" value="Login"  /> */}
                <input className={style.form__btn} type="submit" value="Login"  />
              </form>
            </div>
          </div>
          {alertError && <div className={`${alertError ? 'alert__error active': 'alert__error'}`}>{alertError}</div>}
        </div>
        </div>
    </>
  );
}