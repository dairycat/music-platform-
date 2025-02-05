import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  updateUser,
  becomeArtist,
  logoutUser,
} from "../../../store/thunks/user";
import { useRef } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../utils";

const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const formInfoRef = useRef();
  const formPassRef = useRef();

  const navigate = useNavigate();

  const formInfoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formInfoRef.current);

    dispatch(updateUser(formData));
  };

  const formPassHandler = (e) => {
    e.preventDefault();

    const data = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      passwordConfirm: e.target[2].value,
    };

    dispatch(updatePassword(data));
  };

  const becomeArtistHandler = () => {
    dispatch(becomeArtist());
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    logout()
  };

  return (
    <>
      {user.name ? (
        <div className="profile">
          <div className="profile__header">
            <div className="profile__photo">
              <img src={user.img} alt="Avatar" />
            </div>
            <div className="profile__info">
              <span>我的主页</span>
              <h1 className="profile__name">{user.name}</h1>
              <span>{user.followedArtists.length} 关注</span>
            </div>
          </div>
          <div className="profile__body">
            <div className="profile__form">
              <h2>编辑个人主页</h2>
              <form ref={formInfoRef} onSubmit={formInfoHandler}>
                <label htmlFor="name">昵称</label>
                <input
                  type="text"
                  name="name"
                  minLength="3"
                  maxLength="24"
                  placeholder={user.name}
                />
                <label htmlFor="email">邮箱</label>
                <input type="text" name="email" placeholder={user.email} />
                <label htmlFor="photo">头像</label>
                <input type="file" name="photo" accept="image/*" />
                <button type="submit">保存</button>
              </form>
              <h2>更改密码</h2>
              <form ref={formPassRef} onSubmit={formPassHandler}>
                <label htmlFor="oldPassword">旧密码</label>
                <input
                  type="password"
                  name="oldPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="newPassword">新密码</label>
                <input
                  type="password"
                  name="newPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="confirmPassword">确认密码</label>
                <input
                  type="password"
                  name="confirmPassword"
                  minLength="8"
                  maxLength="16"
                />
                <button type="submit">保存</button>
              </form>
              {user.role === "user" && (
                <p
                  onClick={becomeArtistHandler}
                  style={{ color: "#22c55e", cursor: "pointer" }}
                >
                  🎤 成为创作者
                </p>
              )}
              <p
                onClick={logoutHandler}
                style={{ color: "#ef4444", cursor: "pointer" }}
              >
                ✈️ 退出
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>您还未登入!!</div>
      )}
    </>
  );
};

export default Profile;
