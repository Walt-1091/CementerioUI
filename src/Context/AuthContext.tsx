import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { IToken } from '../Interfaces/IToken';
import { toast } from 'react-toastify';

interface AuthContextProps {
  autenticado: boolean;
  token: IToken | null;
  expiracion: Date | null;
  usuario: any | null;
  signIn: (token: IToken) => Promise<void>;
  logout: () => void;
  verificarAutenticacion: () => boolean;
}

const AUTH_TOKEN_KEY = 'auth_token';
const TOKEN_VALUE_KEY = 'token';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<IToken | null>(null);
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [expiracion, setExpiracion] = useState<Date | null>(null);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  const verificarAutenticacion = (): boolean => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!storedToken) {
      return false;
    }

    try {
      const parsedToken = JSON.parse(storedToken) as IToken;
      const fechaExpiracion = new Date(parsedToken.fechaExpira);
      const ahora = new Date();
      
      if (fechaExpiracion <= ahora) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(TOKEN_VALUE_KEY);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  };

  useEffect(() => {
    const inicializarAuth = () => {
      try {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        
        if (storedToken && verificarAutenticacion()) {
          const parsedToken = JSON.parse(storedToken) as IToken;
          setToken(parsedToken);
          setAutenticado(true);
          setExpiracion(new Date(parsedToken.fechaExpira));
          setUsuario(parsedToken.username || null);
          
          localStorage.setItem(TOKEN_VALUE_KEY, parsedToken.access_token);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        logout();
      } finally {
        setCargando(false);
      }
    };

    inicializarAuth();
    
    const interval = setInterval(() => {
      if (!verificarAutenticacion() && autenticado) {
        logout();
      }
    }, 600000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!expiracion) return;
    
    const ahora = new Date();
    const tiempoHastaExpiracion = new Date(expiracion).getTime() - ahora.getTime();
    
    if (tiempoHastaExpiracion <= 0) {
      logout();
      return;
    }
    
    const timer = setTimeout(() => {
      logout();
    }, tiempoHastaExpiracion);
    
    return () => clearTimeout(timer);
  }, [expiracion]);

  const signIn = async (token: IToken) => {
    try {
      setToken(token);
      setAutenticado(true);
      setExpiracion(new Date(token.fechaExpira));
      setUsuario(token.username || null);
      
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
      localStorage.setItem(TOKEN_VALUE_KEY, token.access_token);
      toast.success("Inicio de sesión exitoso.");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Credenciales inválidas o error de conexión.");
      logout();
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setAutenticado(false);
    setExpiracion(null);
    setUsuario(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_VALUE_KEY);
    navigate("/login");
  };

  if (cargando) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ 
      autenticado, 
      token, 
      expiracion, 
      usuario, 
      signIn, 
      logout,
      verificarAutenticacion
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);