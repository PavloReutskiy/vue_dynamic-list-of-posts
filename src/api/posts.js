import { client } from "../utils/httpClient";

export const getPosts = () => {
  return client.get('/posts?userId=10924')
}

export const getPost = (postId) => {
  return client.get(`/posts/${postId}`)
}

export const createPost = (title, body) => {
  return client.post('/posts', {
    title,
    body,
    userId: 10924,
  })
}
