
  const API_KEY = '68540de5bb5ccc6841f6d94c';
  const DB_URL = 'https://lionbef-66bb.restdb.io/rest/login';

  async function login(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const query = encodeURIComponent(JSON.stringify({ email }));
      const res = await fetch(`${DB_URL}?q=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          'cache-control': 'no-cache'
        }
      });

      const users = await res.json();

      if (users.length === 0) {
        alert("User not found.");
        return;
      }

      const user = users[0];
      if (user.password === password) {
        alert("Login successful!");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name || '');
        window.location.href = 'home.html';
      } else {
        alert("Incorrect password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  }

