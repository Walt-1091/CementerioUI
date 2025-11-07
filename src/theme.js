// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#1E3A8A' }, //Color del header, botón consultar y letra agregar Dashboard
    secondary: { main: '#1E3A8A' }, //Color del botón ver y los numeros del card, Agregasr nicho
    neutral:   { main: '#6B7280', dark: '#4B5563', contrastText: '#FFFFFF' },
    background:{ default: '#F3F4F6', paper: '#FFFFFF' },//Color del fondo de la pantalla y color de los card
    text:      { primary: '#111827' }, //Color de las letras
    warning:   { main: '#FACC15' }, //Color del warning del dashboard
    error:     { main: '#DC2626' },
    divider:   '#E5E7EB',
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: 0.2 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 10px 24px rgba(17,24,39,0.08)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          '& fieldset': { borderColor: '#E5E7EB' },
          '&:hover fieldset': { borderColor: '#CBD5E1' },
          '&.Mui-focused fieldset': { borderColor: '#3B82F6' },
        },
        input: { height: 44, padding: '12px 14px' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 44,
          paddingInline: 18,
          boxShadow: 'none',
        },
        containedSecondary: {
          color: '#FFFFFF',
        },
        // Soporte de "color='neutral'" para Cancelar
        containedNeutral: {
          backgroundColor: '#6B7280', //Botón cancelar y cerrar sesión
          color: '#FFFFFF',
          '&:hover': { backgroundColor: '#4B5563' },
        },
      },
    },
  },
});
