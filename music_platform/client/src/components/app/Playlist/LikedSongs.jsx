import "./Playlist.scss";
import { IoPlayCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import List from "../../UI/List";
import { replaceQueue } from "../../../store/reducers/queue";

const Playlist = () => {
  const likedSongs = useSelector((state) => state.user.data.likedSongs);
  const dispatch = useDispatch();

  const replaceQueueHandler = (songs) => {
    dispatch(replaceQueue({ songs }));
  };

  return (
    <>
      {likedSongs ? (
        <div className="playlist likedSongs">
          <div className="playlist__header">
            <div>
              <h1 className="playlist__name">我喜欢的音乐</h1>
              <div className="playlist__user">
                <span>共有 {likedSongs.length} 首音乐</span>
              </div>
            </div>
          </div>

          <div className="playlist__nav">
        <h2>播放</h2>
            <IoPlayCircle onClick={() => replaceQueueHandler(likedSongs)} />
          </div>

          <div className="playlist__songs">
            <List list={likedSongs} />
          </div>
        </div>
      ) : (
        <div>加载中</div>
      )}
    </>
  );
};

export default Playlist;
