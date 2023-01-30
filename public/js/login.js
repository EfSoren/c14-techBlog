const submitBtn = document.getElementById("login-send");

submitBtn.addEventListener("click", async function loginSubmit(e) {
  e.preventDefault();

  const username = document.getElementById("username-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/login", {
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
