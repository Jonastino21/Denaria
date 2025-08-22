import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 30 minutes en ms

function useAutoLogout() {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token"); // Ou autre stockage
    navigate("/login");
    alert("Vous avez été déconnecté pour cause d'inactivité.");
  };

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    resetTimeout(); // Démarrer le timer au chargement

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimeout));
    };
  }, []);

  return null; // Hook à appeler dans App.js ou Layout
}

export default useAutoLogout;
