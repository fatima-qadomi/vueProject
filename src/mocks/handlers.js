import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/signup", async ({ request }) => {
    const userData = await request.json();

    // send data to JSON Server
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return HttpResponse.json({ message: "User created successfully", user: data }, { status: 201 });
  }),

  // Login
  http.post("/login", async ({ request }) => {
    const { email, password } = await request.json();

    // get users from JSON Server
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      return HttpResponse.json({ message: "Login successful!", user }, { status: 200 });
    } else {
      return HttpResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
  }),
];
