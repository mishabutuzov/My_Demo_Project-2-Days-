import {postAPI} from "../api/api";
import { store } from './../index';



const SET_TEST = 'SET_TEST'
const SET_DATA = 'SET_DATA'
const SET_POSTS_BY_PAGES = 'SET_POSTS_BY_PAGES';
const TOGGLE_COMMENT = 'TOGGLE_COMMENT';

const defaultState = {
    currentUser: 'Guest',
    searchStr: '',
    pagination: {
        totalPages: 5,
        total: 0,
        page: 1
    },
    cardData: [
        {
            id: 1,
            title: 'MyDream',
            username: 'Jeremy',
            likes: [],
            dislikes: [],
            votesNumber: 0,
            timeStamp: new Date(),
            image: 'empty',
            isOpen:false,
            comments: [
                {
                    text: 'Spasibo',
                    postId: 1,
                    id: 1,
                    username: 'Aboba',
                    dislikes: [],
                    likes: [],
                    votesNumber: 0,
                    timeStamp: new Date()
                }
            ]
        }
            
    ]

}


const storeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {

            }
        case SET_TEST:
            return {...state, currentUser: action.payload}
        case SET_POSTS_BY_PAGES:
            return {...state, cardData: action.payload}
        case TOGGLE_COMMENT:
            let buf = [...state.cardData];
            let postId = [...state.cardData].findIndex(post => post.id === action.payload);
            buf[postId].isOpen = !buf[postId].isOpen;
            
            return {...state, cardData: buf}
        default:
            return defaultState
    }
}


export const setPostsByPages = (payload) => ({type: SET_POSTS_BY_PAGES, payload})
export const toggleComment = (payload) => ({type: TOGGLE_COMMENT, payload})





export const getPostsByPages = (page) => {
    return (dispatch) =>{
        let cardDataBuffer;
        postAPI.getPostsByPages(page).then(
            data => {
                console.log(data)
                cardDataBuffer = JSON.parse(JSON.stringify(data.result)) // make deep copy that will not change original data
                cardDataBuffer = cardDataBuffer.map(item => {
                    item['timeStamp'] = item['date']
                    delete item['date'];
                    item['isOpen'] = false;
                    item['votesNumber'] = item['likes'].length - item['dislikes'].length;
                    let commentsBuffer = JSON.parse(JSON.stringify(item['comments']));
                    commentsBuffer = commentsBuffer.map(comment => {
                        comment['votesNumber'] = comment['likes'].length - comment['dislikes'].length;
                        return comment;
                    })
                    item['comments'] = commentsBuffer;
                    return item;
                })

                cardDataBuffer = cardDataBuffer.sort((a, b) => {
                      return b.id - a.id;
                    });

                dispatch(setPostsByPages(cardDataBuffer))
            }
        );

    }}


    export const getPostsByKeyword = (keyword) => {
        return (dispatch) =>{
            let cardDataBuffer;
            postAPI.getPostsByKeyword(keyword).then(
                data => {
                    console.log(data)
                    cardDataBuffer = JSON.parse(JSON.stringify(data.result)) // make deep copy that will not change original data
                    cardDataBuffer = cardDataBuffer.map(item => {
                        item['timeStamp'] = item['date']
                        delete item['date'];
    
    
                        item['isOpen'] = false;
    
    
                        item['votesNumber'] = item['likes'].length - item['dislikes'].length;
                        let commentsBuffer = JSON.parse(JSON.stringify(item['comments']));
                        commentsBuffer = commentsBuffer.map(comment => {
                            comment['votesNumber'] = comment['likes'].length - comment['dislikes'].length;
                            return comment;
                        })
                        item['comments'] = commentsBuffer;
                        
                        return item;
                    })
    
                    cardDataBuffer = cardDataBuffer.sort((a, b) => {
                          return b.id - a.id;
                        });
    
                    dispatch(setPostsByPages(cardDataBuffer))
                }
            );
    
        }}

    export const createPost = (title,username) => {
        return (dispatch) => {
            postAPI.createPost(title,username).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log(data)
                }
            )
        }
    }

    export const deletePost = (id) => {
        return (dispatch) => {
            postAPI.deletePost(id).then(
                data => {
                    console.log(data)
                    dispatch(getPostsByPages(1))   
                }
            )
        }
    }
    export const deleteComment = (postId,id) => {
        return (dispatch) => {
            postAPI.deleteComment(id).then(
                data => {
                    console.log(data)
                    dispatch(getPostsByPages(1))   
                    setTimeout(() => {
                        dispatch(toggleComment(postId))
                    },20)
                }
            )
        }
    }
    export const editPost = (id,title) => {
        return (dispatch) => {
            postAPI.editPost(id,title).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log(data)
                }
            )
        }
    }
    export const addPostLike = (id,username) => {
        let flag = false;
        let likesBuf = store.getState().cardData.find(post => post.id === id).likes;
        flag = likesBuf.includes(username);
        if(!flag){
            likesBuf.push(username)
            console.log(likesBuf + " ---IS DONE");
        }
        return (dispatch) => {
            if(flag) 
                return null;
            postAPI.addPostLike(id,likesBuf).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log("POST API SEND", data)
                }
            )
        }
    }
    export const addCommentLike = (postId,id,username) => {
        let flag = false;
        let likesBuf = store.getState().cardData.find(post => post.id === postId).comments.find(comment => comment.id === id).likes;
        console.warn(likesBuf);
        flag = likesBuf.includes(username);
        if(!flag){
            likesBuf.push(username)
            console.log(likesBuf + " ---LIKE IN REDUCER COMMENT DONE");
        }
        return (dispatch) => {
            if(flag) 
                return null;
            postAPI.addCommentLike(id,likesBuf).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log("POST API comment like SEND", data)
                    setTimeout(() => {
                        dispatch(toggleComment(postId))
                    },20)
                }
            )
        }
    }
    export const addPostDislike = (id,username) => {
        let flag = false;
        let dislikesBuf = store.getState().cardData.find(post => post.id === id).dislikes;
        flag = dislikesBuf.includes(username);
        if(!flag){
            dislikesBuf.push(username)
        }
        return (dispatch) => {
            if(flag) 
                return null;
            postAPI.addPostDislike(id,dislikesBuf).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log("POST API SEND", data)
                }
            )
        }
    }
    export const addCommentDislike = (postId,id,username) => {
        let flag = false;
        let dislikesBuf = store.getState().cardData.find(post => post.id === postId).comments.find(comment => comment.id === id).dislikes;
        flag = dislikesBuf.includes(username);
        if(!flag){
            dislikesBuf.push(username)
        }
        return (dispatch) => {
            if(flag) 
                return null;
            postAPI.addCommentDislike(id,dislikesBuf).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log("POST API comment dislike SEND", data)
                    setTimeout(() => {
                        dispatch(toggleComment(postId))
                    },20)
                }
            )
        }
    }
    export const createComment = (text,postId,username) => {
        return (dispatch) => {
            postAPI.createComment(text,postId,username).then(
                data => {
                    dispatch(getPostsByPages(1))
                    setTimeout(() => {
                        dispatch(toggleComment(postId))
                    },20)
                    console.log(data)
                }
            )
        }
    }
    export const editComment = (postId,id,text) => {
        console.log(postId);
        return (dispatch) => {
            postAPI.editComment(id,text).then(
                data => {
                    dispatch(getPostsByPages(1))
                    console.log(data);
                    setTimeout(() => {
                        dispatch(toggleComment(postId))
                    },20)
                }
            )
        }
    }



export default storeReducer;