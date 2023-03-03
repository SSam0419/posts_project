import axios from "axios";

const baseURL = "http://localhost:5000";

export const getPostById = async (postId) => {
  const url = baseURL + "/posts/get_post_by_id";
  const result = await axios
    .post(url, { id: postId })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
};
