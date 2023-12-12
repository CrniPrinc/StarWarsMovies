import "../css/Login.scss";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
  return (
    <div className="flexCenter login">
      <h1>Welcome to the Star Wars</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
