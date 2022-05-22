import * as axios from "axios";


const instance = axios.create(
    {
        baseURL: 'http://localhost:8080/',
    });

export const postAPI = {
    getPostsByPages(page = 1) {
        return instance.get(`/post/page/${page}`)
            .then(response => response.data)
    },
    getPostsByKeyword(keyword) {
        return instance.get(`post/search/${keyword}`)
            .then(response => response.data)
    },
    createPost(title,username) {
        return instance.post(`/post/`,{title,username})
            .then(response => response.data)
    },
    deletePost(id) {
        console.log(id, "POST DELETED API JS");
        return instance.delete(`/post/${id}`)
            .then(response => response.data)
    },
    deleteComment(id) {
        console.log(id, "comment DELETED API JS");
        return instance.delete(`/comment/${id}`)
            .then(response => response.data)
    },
    editPost(id,title){
        console.warn(id,title);
        return instance.put(`/post/${id}`,{title})
            .then(response => response.data)
    },
    addPostLike(id,likes){
        console.log('api.js liked post',id,likes);
        return instance.put(`/post/${id}`,{likes})
        .then(response => response.data)
    },
    addPostDislike(id,dislikes){
        console.log('api.js dislike post',id,dislikes);
        return instance.put(`/post/${id}`,{dislikes})
        .then(response => response.data)
    },
    createComment(text,postId,username) {
        return instance.post(`/comment/`,{text,postId,username})
            .then(response => response.data)
    },
    addCommentLike(id,likes){
        console.log('api.js liked comment',id,likes);
        return instance.put(`/comment/${id}`,{likes})
        .then(response => response.data)
    },
    addCommentDislike(id,dislikes){
        console.log('api.js disliked comment',id,dislikes);
        return instance.put(`/comment/${id}`,{dislikes})
        .then(response => response.data)
    },
    editComment(id,text){
        return instance.put(`/comment/${id}`,{text})
        .then(response => response.data)
    },
}

// export const profileAPI = {
//     getProfile(userId){
//         return instance.get(profile/ + userId)
//     }
// }

