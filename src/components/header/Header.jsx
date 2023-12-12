import { useDispatch, useSelector } from "react-redux";
import "../../css/Header.scss";
import { authActions } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import SnackBar from "../snackBar/SnackBar";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <header className="flexCenter header">
      <img
        src="../../assets/star-wars-logo.png"
        alt="Star wars"
        onClick={() => navigate("/")}
      />
      <SnackBar />
      {isLoggedIn && <button onClick={logoutHandler}>Log out</button>}
    </header>
  );
};

export default Header;
