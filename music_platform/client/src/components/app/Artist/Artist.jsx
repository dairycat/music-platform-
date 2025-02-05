import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import { IoPlayCircle } from "react-icons/io5";
import List from "../../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../store/thunks/artist";
import { replaceQueue } from "../../../store/reducers/queue";
import { followArtist, unfollowArtist } from "../../../store/thunks/user";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../UI/Loading";

const Artist = () => {
  const { artist } = useSelector((state) => state.artist);
  const { followedArtists } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getArtist(id));
  }, [id]);

  const userFollowedArtist = (id) => {
    let res = followedArtists.find((obj) => obj.id === id);

    return !!res;
  };

  const followArtistHandler = () => {
    dispatch(followArtist(artist.id));
  };

  const unfollowArtistHandler = () => {
    dispatch(unfollowArtist(artist.id));
  };

  const replaceQueueHandler = (songs) => {
    if (songs.length > 0) dispatch(replaceQueue({ songs }));
  };

  return (
    <>
      {artist ? (
        <div className="artist">
          <div className="artist__header">
            <span className="artist__badge">
              <img src={badgeImg} alt="Verified badge" /> 认证音乐人
            </span>
            <h1 className="artist__name">{artist.name}</h1>
            <p>
              他有
              {artist.songs.reduce((acc, song) => acc + song.plays, 0)}{" "}
              位听众
            </p>
          </div>

          <div className="artist__nav">
            <h2>播放</h2>
            <IoPlayCircle onClick={() => replaceQueueHandler(artist.songs)} />
            {!userFollowedArtist(artist.id) ? (
              <button onClick={followArtistHandler}>关注</button>
            ) : (
              <button onClick={unfollowArtistHandler}>己关注</button>
            )}
          </div>

          <div className="artist__songs">
            <div>
              <h2 className="h2">热门</h2>
              <List list={artist.songs} />
            </div>
            <div>
              <h2 className="h2">我喜欢的</h2>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Artist;
