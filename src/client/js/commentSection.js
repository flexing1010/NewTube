const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".deleteComment");

const deleteFakeComment = (event) => {
  event.target.parentNode.remove();
  handleDelete(event);
};

// to add a fake comment //
const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  span.className = "commentText";
  span2.innerText = " ❌";
  span2.className = "deleteComment";

  span.innerText = ` ${text}`;
  icon.className = "fas fa-comment ";
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentId;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  span2.addEventListener("click", deleteFakeComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    //telling to express to treat this request data as a json
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    //response에서 json을 추출하기 위한 코드
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const {
    target: { parentNode },
    target: {
      parentNode: {
        dataset: { id },
      },
    },
  } = event;
  parentNode.remove();
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}
