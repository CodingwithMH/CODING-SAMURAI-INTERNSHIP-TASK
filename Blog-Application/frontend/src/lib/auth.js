export const authService = {
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }

    return { success: false, error: "Invalid credentials" }
  },

  register: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "User already exists" }
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

    return { success: true, user: userWithoutPassword }
  },

  logout: () => {
    localStorage.removeItem("currentUser")
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("currentUser")
  },
}
