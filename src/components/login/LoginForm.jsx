import "../../css/LoginForm.scss";
import { useEffect, useRef } from "react";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { snackBarActions } from "../../store/slices/snackBarSlice";

// eslint-disable-next-line react/prop-types
const LoginForm = () => {
  const {
    value: email,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: password,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
  } = useInput((value) => value.trim().length > 5);

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies");
    }
  }, [isLoggedIn, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!emailIsValid) {
      emailRef.current.focus();
      return;
    } else if (!passwordIsValid) {
      passwordRef.current.focus();
      return;
    } else {
      dispatch(authActions.login());
      dispatch(
        snackBarActions.showSnackbar({
          message: "Successfully logged in",
        })
      );
      navigate("/movies");
    }
  };

  const emailClasses = emailHasError ? "formControl invalid" : "formControl";
  const passwordClasses = passwordHasError
    ? "formControl invalid"
    : "formControl";

  return (
    <form onSubmit={submitHandler}>
      <h2>Log in</h2>
      <div className={emailClasses}>
        <label htmlFor="email">Email:</label>
        <input
          ref={emailRef}
          id="email"
          placeholder="Email..."
          type="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter valid email</p>
        )}
      </div>
      <div className={passwordClasses}>
        <label htmlFor="password">Password:</label>
        <input
          ref={passwordRef}
          id="password"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="error-text">
            Please enter password longer than 5 characters
          </p>
        )}
      </div>
      <button className="btn">Log in</button>
    </form>
  );
};

export default LoginForm;
