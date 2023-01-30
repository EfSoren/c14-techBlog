const newPostBtn = document.getElementById("add-post-btn");

newPostBtn.addEventListener("click", async function openPost(e) {
  e.preventDefault();
  newPostBtn.classList.add("hidden");
  const removeHide = document.getElementById("create-post-form");
  removeHide.classList.remove("hidden");

  const submitPostBtn = document.getElementById("send-post-btn");
  submitPostBtn.addEventListener("click", async function sendPost(e) {
    e.preventDefault();

    const postTitle = document.getElementById("new-title").value.trim();
    const postText = document.getElementById("new-post-text").value.trim();
    const userId = document.getElementById("user-id").innerHTML;
    console.log(userId);
    if (!userId || !postText || !postTitle) {
      console.log("post failed");
      return;
    } else {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator_id: userId,
          title: postTitle,
          post_text: postText,
        }),
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Post Failed");
      }
    }
  });
});

const btns = document.querySelectorAll(".comment-btn");
console.log(btns);
btns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    newPostBtn.classList.add("hidden");
    const removeHide = document.getElementById("edit-post-form");
    removeHide.classList.remove("hidden");
    const postId = btn.innerHTML.split("#")[1];
    console.log(postId);
    const editPostSend = document.getElementById("edit-post-btn");
    editPostSend.addEventListener("click", async function (e) {
      e.preventDefault();
      console.log("clicking");
      const newPostText = document
        .getElementById("updated-post-text")
        .value.trim();
      console.log(newPostText);
      if (!newPostText) {
        return;
      } else {
        const response = await fetch("/api/post", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: postId,
            post_text: newPostText,
          }),
        });
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          newPostBtn.classList.remove("hidden");
          alert("Update Failed");
        }
      }
    });
  });
});
const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const postId = btn.innerHTML.split("#")[1];
    console.log(postId);
    if (postId) {
      const response = await fetch(`/api/post/${postId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      }
    }
  });
});

/* const editPostBtn = document.getElementById("comment-button");

editPostBtn.addEventListener("click", async function openPost(e) {
  e.preventDefault();
  newPostBtn.classList.add("hidden");
  const removeHide = document.getElementById("edit-post-form");
  removeHide.classList.remove("hidden");
  let postTitleValue = editPostBtn.getAttribute("value");
  console.log(postTitleValue);

  const editPostSend = document.getElementById("edit-post-btn");
  editPostSend.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log("clicking");
    const newPostText = document
      .getElementById("updated-post-text")
      .value.trim();
    console.log(newPostText);
    if (!newPostText) {
      return;
    } else {
      const response = await fetch("/api/post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_text: newPostText,
        }),
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        newPostBtn.classList.remove("hidden");
        alert("Update Failed");
      }
    }
  });
});
 */
