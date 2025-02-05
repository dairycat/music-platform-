import "./Nav.scss";
import "./NavLibrary.scss";
import likedSongsImg from "../../img/likedSongs.jpeg";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoMusicalNoteOutline,
  IoPersonCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { createPlaylist } from "../../store/thunks/user";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaWallet } from "react-icons/fa";
import { accountId, login } from "../../utils";
import logo from "../../img/logo.svg";

const Nav = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const isArtist = (el) => el.role === "artist";

  const createPlaylistHandler = () => {
    dispatch(createPlaylist());
  };

  return (
    <div className="nav">
      <div className="nav__block">

      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <img className="auth__form-logo" src={logo} alt="" />

      <p className="auth__form-title">区块链音乐共享平台</p>

        <Link to={"/"} className="nav-link">
          <IoHomeOutline />
          <span>首页</span>
        </Link>
        <Link to="/search" className="nav-link">
          <IoSearch />
          <span>搜索</span>
        </Link>
      </div>
      <div className="library">
        <div className="library__header">
          <IoLibraryOutline />
          <span>音乐库</span>
          <IoAddCircleOutline
            style={{ marginLeft: "auto", fontSize: 28, cursor: "pointer" }}
            onClick={createPlaylistHandler}
          />
        </div>
        {user.id && (
          <div className="saved">
            <Link to="/likedSongs" className="saved__link">
              <img src={likedSongsImg} alt="Heart" />
              <span>📌 - 我喜欢的音乐</span>
            </Link>
            {[
              ...user.likedPlaylists,
              ...user.followedArtists,
              ...user.playlists,
            ]
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((el) => (
                <NavLink
                  key={el.id}
                  to={(isArtist(el) ? "/artist/" : "/playlist/") + el.id}
                  className={() => {
                    return `saved__link ${
                      isArtist(el) ? "saved__link--artist" : ""
                    } ${el.id === "6513505bef35c9d633139956" ? "vip" : ""}`;
                  }}
                >
                  <img src={el.img} alt={el.name} />
                  <span>{el.name}</span>
                </NavLink>
              ))}
          </div>
        )}
      </div>
      <div className="nav__block">
        {user?.role === "artist" && (
          <Link to="/admin" className="nav-link">
            <IoMusicalNoteOutline />
            <span>创作中心</span>
          </Link>
        )}
          {user?.role === "artist" && (
          <Link to="/artist-reward" className="nav-link">
            <IoMusicalNoteOutline />
            <span>我的收藏</span>
          </Link>
        )}
        <Link to="/profile" className="nav-link">
          <IoPersonCircleOutline />
          <span>我的主页</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
