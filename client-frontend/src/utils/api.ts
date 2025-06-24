const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    credentials: "include", // Important: sends HTTP-only cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Auth API functions
export const authAPI = {
  // Institute login
  login: (email: string, password: string) =>
    apiCall("/api/institute/login", {
      method: "POST",
      body: JSON.stringify({
        contactEmail: email,
        password,
      }),
    }),

  // Institute registration
  register: (data: any) =>
    apiCall("/api/institute/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Get current session
  getSession: () => apiCall("/api/institute/session"),

  // Logout
  logout: () =>
    apiCall("/api/institute/logout", {
      method: "POST",
    }),

  // Refresh token
  refreshToken: () =>
    apiCall("/api/institute/refresh", {
      method: "POST",
    }),
};

export default apiCall;
