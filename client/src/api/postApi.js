import axios from "axios";

const baseURL = "http://localhost:5000";

export const getAllPosts = async () => {
  const url = baseURL + "/posts/get_all_posts";

  const result = await axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
};

export const getPostById = async (postId) => {
  const url = baseURL + "/posts/get_post_by_id";
  const result = await axios
    .post(url, { id: postId })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
};
