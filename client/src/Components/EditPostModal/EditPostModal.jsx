import React, { useRef, useState,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editPostModal.css";
import { LoginContext } from "../LoginWindow/LoginContext";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPost } from "../../Redux/storeReducer";


export default function EditPostModal(props) {
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
    // console.log(context.postId,textRef.current.value);
    dispatch(editPost(context.postId,textRef.current.value));

    props.setShowEditPostModal(false);
  }

  return (
    <>
      <div className="blur sign-form-overlay"></div>
      <div id="sign-form" className="sign-form p-3 text-center">
        <div className="d-flex  text-center  justify-content-center align-items-center">
          <h2 className="w-100 text-center ">Edit Post</h2>
          <div className="">
            <button
              className="btnClose"
              onClick={() => {
                props.setShowEditPostModal(false);
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
              Title
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
            className="btn btn-warning">Edit</button>
          </div>
        </form>
      </div>
    </>
  );
}
