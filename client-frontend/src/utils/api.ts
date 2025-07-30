const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_LOCAL_API_BASE_URL;

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

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete defaultOptions.headers?.["Content-Type"];
  }

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (response.status === 401) {
      // Return 401 errors as part of response data instead of throwing
      return { error: "Unauthorized access - your session has expired" };
    } else if (!response.ok) {
      // Handle other HTTP errors - return error in response instead of throwing
      const errorMessage =
        data.message || data.error || `HTTP error! status: ${response.status}`;
      return { error: errorMessage };
    }

    return data;
  } catch (error) {
    // Handle network errors and other exceptions
    if (error instanceof Error) {
      // Only log non-401 errors
      if (!error.message.includes("Unauthorized")) {
        console.log("API call failed:", error);
      }

      // Return error in response format instead of throwing
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        return {
          error: "Network error. Please check your internet connection.",
        };
      }

      return { error: error.message };
    }

    return { error: "An unexpected error occurred" };
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
  getSession: async () => {
    const storedUserType = localStorage.getItem("userType");
    console.log("📍 Getting session for userType:", storedUserType);

    if (storedUserType === "institute") {
      return apiCall("/api/institute/session");
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/session");
    } else {
      // Try both if no stored type (fallback)
      console.log("🔄 No stored userType, trying both endpoints...");
      try {
        const instituteResult = await apiCall("/api/institute/session");
        if (!instituteResult.error) {
          console.log("✅ Institute session found");
          return instituteResult;
        }
      } catch (error) {
        console.log("❌ Institute session failed");
      }

      try {
        const parentResult = await apiCall("/api/parent/session");
        console.log("📱 Parent session result:", parentResult);
        return parentResult;
      } catch (error) {
        console.log("❌ Parent session failed");
        return { error: "No valid session found" };
      }
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
  refreshToken: async () => {
    const storedUserType = localStorage.getItem("userType");
    console.log("🔄 Refreshing token for userType:", storedUserType);

    if (storedUserType === "institute") {
      return apiCall("/api/institute/refresh", { method: "POST" });
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/refresh", { method: "POST" });
    } else {
      // Try both if no stored type (fallback)
      console.log("🔄 No stored userType for refresh, trying both...");
      try {
        const instituteResult = await apiCall("/api/institute/refresh", {
          method: "POST",
        });
        if (!instituteResult.error) {
          console.log("✅ Institute refresh successful");
          return instituteResult;
        }
      } catch (error) {
        console.log("❌ Institute refresh failed");
      }

      try {
        const parentResult = await apiCall("/api/parent/refresh", {
          method: "POST",
        });
        console.log("📱 Parent refresh result:", parentResult);
        return parentResult;
      } catch (error) {
        console.log("❌ Parent refresh failed");
        return { error: "Refresh failed for both user types" };
      }
    }
  },

  uploadDocument: (documentType: string, file: File) => {
    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("document", file);

    return apiCall("/api/institute/kyc/upload", {
      method: "POST",
      body: formData,
    });
  },

  startKycVerification: (documents: {
    registrationCertificate: any;
    panCard: any;
  }) =>
    apiCall("/api/institute/kyc/verify", {
      method: "POST",
      body: JSON.stringify({ documents }),
    }),

  getKycStatus: () => apiCall("/api/institute/kyc/status"),
};
export const sendChatbotMessage = async (message: string) => {
  return apiCall("/api/chatbot/message", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

export default apiCall;
