import "./Home.scss";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SquareList from "../../UI/SquareList";
import { useEffect } from "react";
import { getMusic } from "../../../store/thunks/admin";
import { getAllArtists } from "../../../store/thunks/user";

const Home = () => {
  const user = useSelector((state) => state.user.data);
  const music = useSelector((state) => state.music.music);
  const artists = useSelector((state) => state.music.artists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMusic());
    dispatch(getAllArtists());
  }, []);

  return (
    user.id && (
      <>
        <div className="home__img" />
        <div className="home">
          <h1 className="h1" onClick={() => toast.success("Wow crazy")}>
           
          </h1>

          <h2 className="h2">
            {user.followedArtists.length === 0
              ? "趋势"
              : "喜欢的音乐家"}
          </h2>
          <SquareList list={artists?.slice(0, 10)} artist={true} home={true} />

          { <h2 className="h2">
            {user.likedPlaylists.length === 0
              ? "你喜爱的音乐家将出现在此..."
              : "最喜欢的列表"}
          </h2> }
          <SquareList list={user.likedPlaylists.slice(0, 5)} home={true} />
        </div>
      </>
    )
  );
};

export default Home;
