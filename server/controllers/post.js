import PostProfile from "../models/post_profile.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostProfile.find({});
    console.log(allPosts);
    res.send(allPosts);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const createPost = (req, res) => {
  console.log(req.body);
  const newPost = req.body;
  new PostProfile({
    title: newPost.title,
    author: newPost.author,
    content: newPost.content,
  })
    .save()
    .then(() => {
      res.send("created");
    })
    .catch((error) => console.log(error.message));
};

export const getPostById = async (req, res) => {
  try {
    const foundPost = await PostProfile.findById(req.body.id).exec();
    console.log(foundPost);
    res.send(foundPost);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
