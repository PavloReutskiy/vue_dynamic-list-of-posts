import { client } from "../utils/httpClient";

export const getPosts = () => {
  return client.get('/posts?userId=10924')
}
