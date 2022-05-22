
import React, {useRef} from 'react';
import searchImage from "../../assets/images/search.png";
import { useDispatch } from "react-redux";
import { getPostsByKeyword } from '../../Redux/storeReducer';
import { getPostsByPages } from './../../Redux/storeReducer';
function SearchingBar(props) {
  const dispatch = useDispatch();
  const wordRef = useRef();
  // const word = wordRef.current.value;
    return (
        <nav className="navbar navbar-expand-lg bg-light rounded-3 ">
        <div className="container-fluid">
          <form >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              ref={wordRef}
            />
         </form>
          <button
            className="btn btn-outline-success rounded-pill d-flex justify-content-center align-items-center ms-2"
            type="submit"
            onClick={() => {
              console.log(wordRef.current.value);
              if(wordRef.current.value.length>0)
                 dispatch(getPostsByKeyword(wordRef.current.value));
              else
                dispatch(getPostsByPages(1))
              
            }}
          >
            <img style={{ width: "20px" }} src={searchImage} alt="search" />
          </button>
         

          
          <button
            type="button"
            className="btn btn-primary btn-sm text-nowrap ms-auto"
            onClick={()=>props.setShowAddPostModal(true)}
          >
            +Add Post
          </button>
        </div>
      </nav>
    );
}

export default SearchingBar;