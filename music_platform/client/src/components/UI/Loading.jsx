import "./Loading.scss";
import loadingSvg from "./../../img/loading.svg";
import { Link } from "react-router-dom";

const Loading = ({ main }) => {
  return (
    <div className="loading">
      <img src={loadingSvg} alt="Loading spinner" />
      {main && (
        <p>
          若连接时间过长，&nbsp;
          <Link to="login">请在此登录</Link>
        </p>
      )}
    </div>
  );
};

export default Loading;
