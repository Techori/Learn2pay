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
  instituteLogin: (email: string, password: string) =>
    apiCall("/api/institute/login", {
      method: "POST",
      body: JSON.stringify({
        contactEmail: email,
        password,
      }),
    }),

  // Parent login
  parentLogin: (email: string, password: string) =>
    apiCall("/api/parent/login", {
      method: "POST",
      body: JSON.stringify({
        parentEmail: email,
        password,
      }),
    }),

  // Institute registration
  register: (data: any) =>
    apiCall("/api/institute/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Session management for institute
  instituteSession: () => apiCall("/api/institute/session"),

  // Session management for parent
  parentSession: () => apiCall("/api/parent/session"),

  // Logout for institute
  instituteLogout: () =>
    apiCall("/api/institute/logout", {
      method: "POST",
    }),

  // Logout for parent
  parentLogout: () =>
    apiCall("/api/parent/logout", {
      method: "POST",
    }),

  // Refresh token for institute
  instituteRefreshToken: () =>
    apiCall("/api/institute/refresh", {
      method: "POST",
    }),

  // Refresh token for parent
  parentRefreshToken: () =>
    apiCall("/api/parent/refresh", {
      method: "POST",
    }),

  // Generic session check based on stored user type
  getSession: () => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "institute") {
      return apiCall("/api/institute/session");
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/session");
    } else {
      // Try both if no stored type (fallback)
      return apiCall("/api/institute/session").catch(() =>
        apiCall("/api/parent/session")
      );
    }
  },

  // Generic logout based on stored user type
  logout: () => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "institute") {
      return apiCall("/api/institute/logout", { method: "POST" });
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/logout", { method: "POST" });
    } else {
      // Try both if no stored type (fallback)
      return apiCall("/api/institute/logout", { method: "POST" }).catch(() =>
        apiCall("/api/parent/logout", { method: "POST" })
      );
    }
  },

  // Generic refresh token based on stored user type
  refreshToken: () => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "institute") {
      return apiCall("/api/institute/refresh", { method: "POST" });
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/refresh", { method: "POST" });
    } else {
      // Try both if no stored type (fallback)
      return apiCall("/api/institute/refresh", { method: "POST" }).catch(() =>
        apiCall("/api/parent/refresh", { method: "POST" })
      );
    }
  },
};

export default apiCall;
