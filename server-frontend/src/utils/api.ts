const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_LOCAL_API_BASE_URL || "http://localhost:3000";

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log("Making API call to:", url);

  const defaultOptions: RequestInit = {
    credentials: "include", // Important: sends HTTP-only cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData
  // if (options.body instanceof FormData) {
  //   delete defaultOptions.headers?.["Content-Type"];
  // }

  try {
    const response = await fetch(url, defaultOptions);

    // Try to parse JSON response, but handle cases where it might fail
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.log("Failed to parse JSON response:", jsonError);
      data = { message: "Invalid response format from server" };
    }

    console.log("Raw API response:", { status: response.status, data });

    if (response.status === 401) {
      // Return 401 errors as part of response data instead of throwing
      return { error: "Unauthorized access - your session has expired" };
    } else if (!response.ok) {
      // Handle other HTTP errors - return error in response instead of throwing
      let errorMessage = `HTTP error! status: ${response.status}`;

      // Try to extract meaningful error messages from different response formats
      if (data) {
        if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          // Handle different error formats
          if (typeof data.error === "string") {
            errorMessage = data.error;
          } else if (data.error.issues && Array.isArray(data.error.issues)) {
            // Handle Zod validation errors
            errorMessage = data.error.issues
              .map((issue: any) => issue.message)
              .join(", ");
          } else if (data.error.fieldErrors) {
            // Handle flattened Zod errors
            const fieldErrors = Object.values(data.error.fieldErrors).flat();
            errorMessage = fieldErrors.join(", ");
          } else {
            errorMessage = JSON.stringify(data.error);
          }
        } else if (data.errors && Array.isArray(data.errors)) {
          // Handle array of errors
          errorMessage = data.errors
            .map((err: any) => err.message || err)
            .join(", ");
        }
      }

      console.log("Extracted error message:", errorMessage);
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

// User authentication functions
export const loginUser = async (email: string, password: string, role: string) => {
  return apiCall("/api/user/login", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });
};

export const logoutUser = async () => {
  return apiCall("/api/user/logout", {
    method: "POST",
  });
};

export const getSession = async () => {
  return apiCall("/api/user/session");
};

export const refreshToken = async () => {
  return apiCall("/api/user/refresh", {
    method: "POST",
  });
}; 

//routes for institute management - admin
export const getAllInstitutes = async () => {
  return apiCall("/api/institute/fetch-all-institutes");
};


export const getAllUsers = async()=>{
  return apiCall("/api/user/fetch-all-users" ,{
    method : "GET"
  });
}

