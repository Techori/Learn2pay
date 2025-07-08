const API_BASE_URL =
  import.meta.env.VITE_LOCAL_API_BASE_URL || "https://learn2pay.onrender.com";

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (response.status === 401) {
      return { error: "Unauthorized access - your session has expired" };
    } else if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error && !error.message.includes("Unauthorized")) {
      console.log("API call failed:", error);
    }
    throw error;
  }
}

export const authAPI = {
  instituteLogin: (email: string, password: string) =>
    apiCall("/api/institute/login", {
      method: "POST",
      body: JSON.stringify({
        contactEmail: email,
        password,
      }),
    }),

  parentLogin: (email: string, password: string) =>
    apiCall("/api/parent/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }),

  register: (data: any) =>
    apiCall("/api/institute/register", {
      method: "POST",
      body: JSON.stringify(data),
      }),

  instituteSession: () => apiCall("/api/institute/session"),
  parentSession: () => apiCall("/api/parent/session"),
  instituteLogout: () =>
    apiCall("/api/institute/logout", {
      method: "POST",
    }),

  parentLogout: () =>
    apiCall("/api/parent/logout", {
      method: "POST",
    }),

  instituteRefreshToken: () =>
    apiCall("/api/institute/refresh", {
      method: "POST",
    }),

  parentRefreshToken: () =>
    apiCall("/token", {
      method: "POST",
    }),

  getSession: async () => {
    const storedUserType = localStorage.getItem("userType");
    console.log("Getting session for userType:", storedUserType);

    if (storedUserType === "institute") {
      return apiCall("/api/institute/session");
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/session");
    } else {
      console.log("No stored userType, trying both endpoints...");
      try {
        const instituteResult = await apiCall("/api/institute/session");
        if (!instituteResult.error) {
          console.log("Institute session found");
          return instituteResult;
        }
      } catch (error) {
        console.log("Institute session failed");
      }

      try {
        const parentResult = await apiCall("/api/parent/session");
        console.log("Parent session:", parentResult);
        return parentResult;
      } catch (error) {
        console.log("Parent session failed");
        return { error: "No valid session found" };
      }
    }
  },

  logout: () => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "institute") {
      return apiCall("/api/institute/logout", { method: "POST" });
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/logout", { method: "POST" });
    } else {
      return apiCall("/api/institute/logout", { method: "POST" }).catch(() =>
        apiCall("/api/parent/logout", { method: "POST" })
      );
    }
  },

  refreshToken: async () => {
    const storedUserType = localStorage.getItem("userType");
    console.log("Refreshing token for userType:", storedUserType);

    if (storedUserType === "institute") {
      return apiCall("/api/institute/refresh", { method: "POST" });
    } else if (storedUserType === "parent") {
      return apiCall("/api/parent/refresh", { method: "POST" });
    } else {
      console.log("No stored userType for refresh, trying both...");
      try {
        const instituteResult = await apiCall("/api/institute/refresh", {
          method: "POST",
        });
        if (!instituteResult.error) {
          console.log("Institute refresh successful");
          return instituteResult;
        }
      } catch (error) {
        console.log("Institute refresh failed");
      }

      try {
        const parentResult = await apiCall("/api/parent/refresh", {
          method: "POST",
        });
        console.log("Parent refresh result:", parentResult);
        return parentResult;
      } catch (error) {
        console.log("Parent refresh failed");
        return { error: "Refresh failed for both user types" };
      }
    }
  },

  uploadDocument: (documentType: string, file: File) => {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('document', file);
    
    return apiCall("/api/institute/kyc/upload", {
      method: "POST",
      body: formData,
      headers: {
        // Remove Content-Type header as FormData sets it automatically
      },
    });
  },

  startKycVerification: () =>
    apiCall("/api/institute/kyc/verify", {
      method: "POST",
    }),

  getKycStatus: () =>
    apiCall("/api/institute/kyc/status"),
};

export default apiCall;