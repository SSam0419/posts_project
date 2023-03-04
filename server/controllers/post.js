import PostProfile from "../models/post_profile.js";

export const getAllPosts = async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const sortMethod = req.body.sort;
    console.log({ from, to, sortMethod });
    const allPosts = await PostProfile.find({})
      .sort(sortMethod)
      .skip(from)
      .limit(to);
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
    console.log(req.body.id);
    const foundPost = await PostProfile.findById(req.body.id).exec();
    res.send(foundPost);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const addComment = async (req, res) => {
  const body = req.body.comment;
  const result = await PostProfile.updateOne(
    { _id: req.body.id },
    {
      $push: {
        comments: { $each: [body], $position: 0 },
      },
    }
  );
  res.send(result);
};

export const likePost = async (req, res) => {
  const username = req.body.username;
  const post_id = req.body.post_id;
  try {
    const result = await PostProfile.updateOne(
      { _id: post_id },
      {
        $push: {
          likes: username,
        },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};

export const viewPost = async (req, res) => {
  const username = req.body.username;
  const post_id = req.body.post_id;
  try {
    const result = await PostProfile.updateOne(
      { _id: post_id },
      {
        $push: {
          views: username,
        },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};
