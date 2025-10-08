import { useNavigate } from "react-router-dom";
import LoginPage from "./../../assets/LoginPage.png"
import "./Auth.css"

export default function Auth() {
    const navigate = useNavigate();

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
              <form className="login-form" method="post" action="users.login">
                <input
                  className="form-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className="form-password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div className="remember-me">
                  <input type="checkbox" id="remember-me" name="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <input className="form-btn" type="submit" value="Login" onClick={(e) => {
                  e.preventDefault()
                  navigate('/assets')
                  }} />
              </form>
              <p className="login-forgot">
                Don't have an account?{" "}
                <a href="register.users">Register</a>
              </p>
            </div>
          </div>
        </div>
          
        </div>
    </>
  );
}