import React, { useContext } from "react";
import editImage from "../../assets/images/edit.svg";
import closeImage from "../../assets/images/close.svg";
import emptyImage from "../../assets/images/photo.svg";
import likeImage from "../../assets/images/like.png";
import dislikeImage from "../../assets/images/dislike.png";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { addPostDislike, toggleComment } from "../../Redux/storeReducer";
import { deletePost, addPostLike } from "./../../Redux/storeReducer";
import { LoginContext } from "./../LoginWindow/LoginContext";

function Post(props) {
  const dispatch = useDispatch();
  const [context, setContext] = useContext(LoginContext);
  const user = localStorage.getItem("login");
  //   console.warn(user)
  const timeStampStr = new Date(
    parseInt(props.postData.timeStamp)
  ).toLocaleString();

  return (
    <>
      {/* MINIMIZED BLOCK */}
      <div className="container mt-3 w-75 rounded-3 border border-2">
        <div className="mt-2 container-fluid d-flex">
          <div className="">{props.postData.title}</div>
          <button
            className={
              "ms-auto  rounded-pill d-flex justify-content-center align-items-center ms-2" +
              (user === props.postData.username
                ? " btn btn-outline-success"
                : " btn btn-outline-secondary")
            }
            disabled={user === props.postData.username ? false : true}
            onClick={() => {
              props.setShowEditPostModal(true);
              setContext({ ...context, postId: props.postData.id });
            }}
            type="submit"
          >
            <img style={{ width: "20px" }} src={editImage} alt="edit" />
          </button>
          <button
            className={
              "btn rounded-pill d-flex justify-content-center align-items-center ms-2" +
              (user === props.postData.username
                ? " btn btn-outline-danger"
                : " btn btn-outline-secondary")
            }
            type="submit"
            disabled={user === props.postData.username ? false : true}
            onClick={() => {
              dispatch(deletePost(props.postData.id));
            }}
          >
            <img style={{ width: "20px" }} src={closeImage} alt="close" />
          </button>
        </div>
        <div className="container-fluid d-flex">
          <div>
            <img style={{ width: "50px" }} src={emptyImage} alt="emptyImage" />
          </div>
          <div className="ms-2">Soon... Waiting to be done in Backend Side</div>
        </div>

        <div className="m-2 d-flex justify-content-between">
          <div>
            <img
              style={{ width: "20px" }}
              src={likeImage}
              alt="like"
              onClick={() => {
                console.log("image clicked");
                dispatch(addPostLike(props.postData.id, user));
              }}
            />
            <span className="ms-1 me-1">{props.postData.votesNumber}</span>
            <img
              style={{ width: "20px" }}
              src={dislikeImage}
              alt="dislike"
              onClick={() => {
                console.log("image clicked");
                dispatch(addPostDislike(props.postData.id, user));
              }}
            />
          </div>
          <button
            type="button"
            // className="ms-3 btn btn-primary btn-sm text-nowrap"
            className={
              "ms-3 btn btn-sm text-nowrap" +
              (props.postData.isOpen ? " btn-secondary" : " btn-primary")
            }
            // style={props.postData.isOpen && { className: " ms-3 btn btn-secondary btn-sm text-nowrap" }}
            onClick={() => {
              dispatch(toggleComment(props.postData.id));
            }}
          >
            Comments
          </button>
          <div>{props.postData.username}</div>
          <div className="fw-light">{timeStampStr}</div>
        </div>
        {/* MAXIMIZED BLOCK */}
        {props.postData.isOpen && (
          <>
            <div className="container d-flex border-top border-bottom">
              <button
                type="button"
                className="ms-auto mt-2 mb-2 btn btn-primary btn-sm text-nowrap"
                onClick={() => {
                  setContext({ ...context, postId: props.postData.id });
                  props.setShowAddCommentModal(true);
                }}
              >
                +Comment
              </button>
            </div>
            {/* <Comment /> */}
            {props.postData.comments.map((comment, index) => (
              <Comment key={index} 
              // commentData={comment} 
              username = {comment.username}
              date = {comment.date}
              dislikes = {comment.dislikes}
              id = {comment.id}
              postId = {comment.postId}
              likes = {comment.likes}
              text = {comment.text}
              votesNumber = {comment.votesNumber}
              setShowEditCommentModal = {props.setShowEditCommentModal}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Post;
