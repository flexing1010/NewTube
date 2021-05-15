//first argument is a view file, second argument is an object of variables to view files
export const trending = (req, res) => {
  const videos = [
    {
      title: "First",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      id: 1,
    },
    {
      title: "Second",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      id: 1,
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
  res.render("watch");
};
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
