let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 100,
    id: 0,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
];

export const trending = (req, res) => {
  //first argument is a view file, second argument is an object of variables for view files
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  //params comes from router :
  const { id } = req.params;
  const video = videos[id];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = (req, res) => {
  //same as id = req.params.id
  const { id } = req.params;
  //this variable title comes from form's name property
  const { newTitle } = req.body;
  videos[id].title = newTitle;
  return res.redirect(`/videos/${id}`);
};
