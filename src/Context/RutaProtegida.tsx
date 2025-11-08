import { useNavigate } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function RutaProtegida({ children }: ProtectedRouteProps) {
  const { verificarAutenticacion, autenticado } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!verificarAutenticacion()) {
      navigate('/login');
    }
  }, [autenticado, navigate]);
  
  return autenticado ? children : null;
}
