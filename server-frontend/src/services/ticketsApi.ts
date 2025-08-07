const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_LOCAL_API_BASE_URL || "http://localhost:3000";

// Generic API call function for tickets
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log("Making API call to:", url);

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
    let data;
    
    try {
      data = await response.json();
    } catch (jsonError) {
      console.log("Failed to parse JSON response:", jsonError);
      data = { message: "Invalid response format from server" };
    }

    console.log("Raw API response:", { status: response.status, data });

    if (response.status === 401) {
      return { error: "Unauthorized access - your session has expired" };
    } else if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      if (data) {
        if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        }
      }
      
      console.log("Extracted error message:", errorMessage);
      return { error: errorMessage };
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("API call failed:", error);
      
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

// Tickets API functions
export const getAllTickets = async (filters: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  category?: string;
  institute?: string;
  assignee?: string;
  search?: string;
} = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  
  const queryString = queryParams.toString();
  const endpoint = `/api/tickets${queryString ? `?${queryString}` : ''}`;
  
  return apiCall(endpoint);
};

export const getTicketById = async (id: string) => {
  return apiCall(`/api/tickets/${id}`);
};

export const createTicket = async (ticketData: {
  title: string;
  message: string;
  category: string;
  priority?: string;
  institute?: string;
  raisedBy?: string;
}) => {
  return apiCall("/api/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData),
  });
};

export const updateTicket = async (id: string, updates: any) => {
  return apiCall(`/api/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
};

export const deleteTicket = async (id: string) => {
  return apiCall(`/api/tickets/${id}`, {
    method: "DELETE",
  });
};

export const updateTicketStatus = async (id: string, status: string) => {
  return apiCall(`/api/tickets/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const assignTicket = async (id: string, assignee: string) => {
  return apiCall(`/api/tickets/${id}/assign`, {
    method: "PATCH",
    body: JSON.stringify({ assignee }),
  });
};

// Fetch all institutes for dropdown
export const getAllInstitutes = async () => {
  return apiCall('/api/institute/fetch-all-institutes');
};

// Helper function to get ticket statistics
export const getTicketStats = async () => {
  const response = await getAllTickets({ limit: 1000 }); // Get all tickets for stats
  
  if (response.error) {
    return { error: response.error };
  }
  
  const tickets = response.data || [];
  
  const stats = {
    total: tickets.length,
    open: tickets.filter((t: any) => t.status === 'New' || t.status === 'In Progress').length,
    avgResponseTime: '2.3h', // This would need to be calculated based on actual data
    resolutionRate: Math.round((tickets.filter((t: any) => t.status === 'Resolved').length / tickets.length) * 100) || 0
  };
  
  return { data: stats };
};
