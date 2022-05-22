import React, {useContext} from "react";
import closeImage from "../../assets/images/close.svg";
import editImage from "../../assets/images/edit.svg";
import likeImage from "../../assets/images/like.png";
import dislikeImage from "../../assets/images/dislike.png";
import { useDispatch } from "react-redux";
import { addCommentDislike, addCommentLike, deleteComment } from "../../Redux/storeReducer";
import { LoginContext } from "./../LoginWindow/LoginContext";

function Comment(props) {
  const [context, setContext] = useContext(LoginContext);
  const dispatch = useDispatch()
  const timeStampStr = new Date(parseInt(props.date)).toLocaleString();
  const user = localStorage.getItem("login");
  console.log(props.id);
  return (
    <div className="container border-top border-bottom">
      <div className="mt-2 container-fluid d-flex ">
        <button
          className={
            "ms-auto  rounded-pill d-flex justify-content-center align-items-center ms-2" +
            (user === props.username
              ? " btn btn-outline-success"
              : " btn btn-outline-secondary")
          }
          type="submit"
          disabled={user === props.username ? false : true}
        >
          <img style={{ width: "20px" }} src={editImage} alt="edit" 
           
              onClick={() => {
                setContext({ ...context, postId: props.postId, commentId: props.id });
                props.setShowEditCommentModal(true);
              }}
          />
        </button>
        <button
            className={
              "btn rounded-pill d-flex justify-content-center align-items-center ms-2" +
              (user === props.username
                ? " btn btn-outline-danger"
                : " btn btn-outline-secondary")
            }
            type="submit"
            disabled={user === props.username ? false : true}
            onClick={() => {
              dispatch(deleteComment(props.postId,props.id));
            }}
          >
            <img style={{ width: "20px" }} src={closeImage} alt="close" />
          </button>
      </div>
      <div className="container-fluid d-flex">
        <div className="ms-2">{props.text}</div>
      </div>

      <div className="m-2 d-flex justify-content-between">
        <div>
          <img
            style={{ width: "20px" }}
            src={likeImage}
            alt="like"
            onClick={() => {
              dispatch(addCommentLike(props.postId, props.id, user));
            }}
          />
          <span className="ms-1 me-1">{props.votesNumber}</span>
          <img
            style={{ width: "20px" }}
            src={dislikeImage}
            alt="dislike"
            onClick={() => {
              dispatch(addCommentDislike(props.postId, props.id, user));
            }}
          />
        </div>

        <div>{props.username}</div>
        <div className="fw-light">{timeStampStr}</div>
      </div>
    </div>
  );
}

export default Comment;
