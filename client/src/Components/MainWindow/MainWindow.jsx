import React, { useState } from "react";
import EditPostModal from "../EditPostModal/EditPostModal";
import SearchingBar from "../SearchingBar/SearchingBar";
import Header from "./../Header/Header";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import AddPostModal from "./../AddPostModal/AddPostModal";
import AddCommentModal from "./../AddCommentModal/AddCommentModal";
import EditCommentModal from "./../EditCommentModal/EditCommentModal";

function MainWindow() {
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const cardData = useSelector((state) => state.cardData);

  return (
    <>
      {showEditPostModal && (
        <EditPostModal setShowEditPostModal={setShowEditPostModal} />
      )}
      {showAddPostModal && (
        <AddPostModal setShowAddPostModal={setShowAddPostModal} />
      )}
      {showAddCommentModal && (
        <AddCommentModal setShowAddCommentModal={setShowAddCommentModal} />
      )}
      {showEditCommentModal && (
        <EditCommentModal setShowEditCommentModal={setShowEditCommentModal} />
      )}
      <Header />
      <div className="container mt-5 rounded-3 p-0">
        {/* calling function in parent component from child(from searching bar) */}
        <SearchingBar setShowAddPostModal={setShowAddPostModal} />
        <section
        // className="border border-primary rounded"
        >
          {cardData.map((item, index) => (
            <Post
              postData={item}
              key={index}
              setShowEditPostModal={setShowEditPostModal}
              setShowAddCommentModal={setShowAddCommentModal}
              setShowEditCommentModal={setShowEditCommentModal}
            />
          ))}
          {/* <Post /> */}
        </section>
      </div>
      <div className="container mt-2 d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <span>pagination is in progress</span>
        <ul className="pagination">
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </>
  );
}

export default MainWindow;
