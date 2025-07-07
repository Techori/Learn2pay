import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAPI } from "../utils/api";

interface Institute {
  id: string;
  name: string;
  email: string;
  type: string;
  contactPerson: string;
}

interface Parent {
  id: string;
  parentName: string;
  parentEmail: string;
  studentName: string;
  instituteName: string;
}

interface AuthContextType {
  institute: Institute | null;
  parent: Parent | null;
  userType: "institute" | "parent" | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    userType: "institute" | "parent"
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [parent, setParent] = useState<Parent | null>(null);
  const [userType, setUserType] = useState<"institute" | "parent" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on app load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setIsLoading(true);
      console.log("🔍 Checking session...");
      let response = await authAPI.getSession();
      console.log("📡 Initial session response:", response);

      // If session check fails (401 - token expired), try to refresh token
      if (response.error && response.error.includes("Unauthorized")) {
        console.log("🔄 Access token expired, attempting refresh...");
        try {
          // Attempt to refresh the token
          const refreshResponse = await authAPI.refreshToken();
          console.log("🔄 Refresh response:", refreshResponse);

          // Check if refresh was successful
          if (refreshResponse.error) {
            console.log("❌ Refresh failed, clearing session");
            // Refresh failed, clear session
            setInstitute(null);
            setParent(null);
            setUserType(null);
            localStorage.removeItem("userType");
            return;
          }

          console.log("✅ Refresh successful, retrying session...");
          // Retry the session call with new access token
          response = await authAPI.getSession();
          console.log("📡 Retry session response:", response);
          // If still getting error after refresh, session is truly invalid
          if (response.error) {
            console.log("❌ Session still invalid after refresh");
            setInstitute(null);
            setParent(null);
            setUserType(null);
            localStorage.removeItem("userType");
            return;
          }

          // After successful refresh, set userType if it wasn't set
          if (!localStorage.getItem("userType")) {
            if (response.institute) {
              localStorage.setItem("userType", "institute");
            } else if (response.parent) {
              localStorage.setItem("userType", "parent");
            }
          }
        } catch (refreshError) {
          console.error("❌ Refresh error:", refreshError);
          // Refresh failed, clear session
          setInstitute(null);
          setParent(null);
          setUserType(null);
          localStorage.removeItem("userType");
          return;
        }
      } else if (response.error) {
        console.log("❌ Other error (not 401):", response.error);
        // Other errors (not 401), clear session
        setInstitute(null);
        setParent(null);
        setUserType(null);
        localStorage.removeItem("userType");
        return;
      }

      if (response.institute) {
        console.log("✅ Institute session active:", response.institute.name);
        setInstitute(response.institute);
        setParent(null);
        setUserType("institute");
        localStorage.setItem("userType", "institute");
      } else if (response.parent) {
        console.log("✅ Parent session active:", response.parent.parentName);
        setParent(response.parent);
        setInstitute(null);
        setUserType("parent");
        localStorage.setItem("userType", "parent");
      } else {
        console.log("❌ No valid session data found");
        setInstitute(null);
        setParent(null);
        setUserType(null);
        localStorage.removeItem("userType");
      }
    } catch (error) {
      // Only log non-401 errors
      if (error instanceof Error && !error.message.includes("Unauthorized")) {
        console.error("Session check failed:", error);
      }
      setInstitute(null);
      setParent(null);
      setUserType(null);
      localStorage.removeItem("userType");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    selectedUserType: "institute" | "parent"
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      let response;
      if (selectedUserType === "institute") {
        response = await authAPI.instituteLogin(email, password);
      } else {
        response = await authAPI.parentLogin(email, password);
      }

      if (response.institute) {
        setInstitute(response.institute);
        setParent(null);
        setUserType("institute");
        localStorage.setItem("userType", "institute");
        return { success: true };
      } else if (response.parent) {
        setParent(response.parent);
        setInstitute(null);
        setUserType("parent");
        localStorage.setItem("userType", "parent");
        return { success: true };
      }

      return { success: false, error: "Login failed" };
    } catch (error: any) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setInstitute(null);
      setParent(null);
      setUserType(null);
      localStorage.removeItem("userType");
    }
  };

  const value = {
    institute,
    parent,
    userType,
    isLoading,
    isAuthenticated: !!(institute || parent),
    login,
    logout,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
