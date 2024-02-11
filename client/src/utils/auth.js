// client/src/utils/auth.js

// Mock login function
export const login = async ({ email, password }) => {
  
  // This is a mock response assuming the credentials match the seeded user.
  if (email === "khoi@example.com" && password === "password123") {
      return { success: true, user: { id: "65c888efe02e73e0036d0960", email: "khoi@example.com" } };
  } else {
      return { success: false, message: "Invalid credentials" };
  }
};
