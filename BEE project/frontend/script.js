const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Toggle Forms
function showLogin() {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
}

function showRegister() {
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
}

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  };

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

  } catch (err) {
    console.log(err);
  }
});

// REGISTER
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: password
  };

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

  } catch (err) {
    console.log(err);
  }
});