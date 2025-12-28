import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api"; // your axios instance

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get("/auth/me"); // cookie is sent automatically
        navigate("/dashboard", { replace: true });
      } catch {
        navigate("/login", { replace: true });
      }
    };

    verify();
  }, [navigate]);

  return <p>Authenticating...</p>;
}
