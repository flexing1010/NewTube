import Video from "../models/Video.js";
import User from "../models/User.js";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  //first db will look for videos on db and we save it to videos variable

  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  //params comes from router :
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    //return is necessary in this case
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  //first argument is a view file, second argument is an object of variables for view files
  return res.render("watch", { pageTitle: video.title, video });
};

// Edit Video//
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  //same as id = req.params.id
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { newTitle, description, hashtags } = req.body;
  //here we can use exists because we only need to know if a video exists or not
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title: newTitle,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved");
  return res.redirect(`/videos/${id}`);
};
// Edit Video//

// Upload Video//
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  //this is equal to fileUrl = req.file.path
  //this is equal to video = req.files.video
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    //error인자는 mongoose에서 온다
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
// Upload Video//

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  //if we make videos array in if it only lives inside of if statement
  //by making it ourside of if, if statement updates videos array
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  //backend is responding to frontend with newCommentId as a json file
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
  } = req;
  const comment = await Comment.findById(id);
  const video = await Video.findById(comment.video);
  await Comment.findByIdAndDelete(id);
  //getrid of item from array
  video.comments.pull(comment);
  video.save();
};
