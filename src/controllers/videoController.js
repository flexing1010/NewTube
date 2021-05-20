import Video from "../models/Video.js";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  //first db will look for videos on db and we save it to videos variable
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  //params comes from router :
  const { id } = req.params;
  const video = await Video.findById(id);
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
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  //same as id = req.params.id
  const { id } = req.params;
  const { newTitle, description, hashtags } = req.body;
  //here we can use exists because we only need to know if a video exists or not
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title: newTitle,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};
// Edit Video//

// Upload Video//
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
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
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
