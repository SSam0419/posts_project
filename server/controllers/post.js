import PostProfile from "../models/post_profile.js";
import UserProfile from "../models/user_profile.js";

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
    category: newPost.category,
  })
    .save(async function (err, post) {
      if (err) {
        return res.sendStatus(400).send(err);
      }

      await UserProfile.updateOne(
        { _id: newPost.authorId },
        {
          $push: {
            wrotePost: { $each: [post.id], $position: 0 },
          },
        }
      );
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => console.log(error.message));

  //push post id into user profile
};

export const getPostById = async (req, res) => {
  try {
    const foundPost = await PostProfile.findById(req.body.id).exec();
    res.send(foundPost);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getManyPostsById = async (req, res) => {
  try {
    console.log(req.body.ids);
    const ids = req.body.ids;
    const records = await PostProfile.find({ _id: { $in: ids } });
    console.log(records);
    res.send(records);
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

export const dislikePost = async (req, res) => {
  const username = req.body.username;
  const post_id = req.body.post_id;
  try {
    const result = await PostProfile.updateOne(
      { _id: post_id },
      {
        $pull: {
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
