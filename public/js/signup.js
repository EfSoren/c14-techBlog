const submitBtn = document.getElementById("create-user");

submitBtn.addEventListener("click", async function createSubmit(e) {
  e.preventDefault();

  const username = document.getElementById("username-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert("Failed to log in");
    }
  }
});
