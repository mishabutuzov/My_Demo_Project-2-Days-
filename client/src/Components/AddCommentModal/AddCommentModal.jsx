import React, { useRef, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./addCommentModal.css";
import { LoginContext } from "../LoginWindow/LoginContext";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment } from './../../Redux/storeReducer';

export default function AddPostModal(props) {
  // eslint-disable-next-line no-unused-vars
  const [context, setContext] = useContext(LoginContext);
  const [error, setError] = useState("");
  const textRef = useRef(null);
  const dispatch = useDispatch();
  const user = localStorage.getItem("login");

  function handleSubmit(e) {
    e.preventDefault();
    setError(""); // clear error
    const addPost = textRef.current.value; //getting text from input
    if (addPost.length <= 6) {
      return setError("Text should be more than 6 letters");
    }
    console.warn(context.postId);
    dispatch(createComment(addPost, context.postId, user))
    props.setShowAddCommentModal(false);
  }

  return (
    <>
      <div className="blur sign-form-overlay"></div>
      <div id="sign-form" className="sign-form p-3 text-center">
        <div className="d-flex  text-center  justify-content-center align-items-center">
          <h2 className="w-100 text-center ">Add Comment</h2>
          <div className="">
            <button
              className="btnClose"
              onClick={() => {
                props.setShowAddCommentModal(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <form className="p-1" onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Text
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              type="submit"
              ref={textRef}
            ></textarea>
          </div>
          <div className="mb-3">
            {!user && <p>Guest</p>}
            {user && (
              <p>
                You logged as: <span className="text-success">{user}</span>
              </p>
            )}
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button 
            type="submit"
            className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </>
  );
}
