import "./Auth.scss";
import logo from "../../img/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { signupUser } from "../../store/thunks/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signup = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const passwordConfirm = e.target[3].value;

    if (password !== passwordConfirm) toast.warn("密码不匹配");
    else dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={signup}>
            <img className="auth__form-logo" src={logo} alt="" />
            <Link to="/login" className="auth__form-link">
              此处登录
            </Link>
            <input
              type="text"
              name="name"
              minLength="3"
              maxLength="24"
              placeholder="昵称"
              required
            />
            <input type="text" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              minLength="8"
              maxLength="16"
              placeholder="密码"
              required
            />
            <input
              type="password"
              name="passwordConfirm"
              minLength="8"
              maxLength="16"
              placeholder="确认密码"
              required
            />
            <button type="submit">注册</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Signup;
