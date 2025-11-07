// src/pages/AddNiche.jsx
import * as React from 'react';
import {
  Box, Card, CardContent, Typography, Stack, TextField, Button, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FileDropzone from '../components/FileDropzone'; // ⬅️ IMPORTANTE

export default function AddNiche() {
  const navigate = useNavigate();

  // Estado simple para los campos (opcional; puedes cambiarlos por tu form lib)
  const [form, setForm] = React.useState({
    numero: '', difunto: '', anualidad: '',
    cedula: '', propietario: '', telefono: '',
    direccion: '', email: '', descripcion: '',
  });
  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  // Archivos con previews: [{file, previewUrl}]
  const [files, setFiles] = React.useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Construye FormData
    const fd = new FormData();
    fd.append('numero', form.numero);
    fd.append('difunto', form.difunto);
    fd.append('anualidad', form.anualidad);
    fd.append('cedula', form.cedula);
    fd.append('propietario', form.propietario);
    fd.append('telefono', form.telefono);
    fd.append('direccion', form.direccion);
    fd.append('email', form.email);
    fd.append('descripcion', form.descripcion);
    files.forEach((it) => fd.append('comprobantes', it.file)); // ⬅️ archivos

    // TODO: Llama a tu API real
    // await fetch('/api/nichos', { method: 'POST', body: fd });

    console.log('Subiendo:', files.map((f) => f.file.name));
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 900, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Encabezado */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={7}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="h4" sx={{ color: 'text.primary' }}>
                Agregar Nicho
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Volver al Inicio
            </Button>
          </Stack>

          <Box mt={8}>

          {/* Formulario */}
          <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField label="Número de Nicho" value={form.numero} onChange={onChange('numero')} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Nombre del Difunto" value={form.difunto} onChange={onChange('difunto')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Última Anualidad Pagada"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.anualidad}
                  onChange={onChange('anualidad')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Cédula del Propietario" value={form.cedula} onChange={onChange('cedula')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Nombre del Propietario" value={form.propietario} onChange={onChange('propietario')} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Teléfono" value={form.telefono} onChange={onChange('telefono')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Dirección" value={form.direccion} onChange={onChange('direccion')} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Correo Electrónico" type="email" value={form.email} onChange={onChange('email')} fullWidth />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Descripción" multiline rows={3} value={form.descripcion} onChange={onChange('descripcion')} fullWidth />
              </Grid>

              {/* Dropzone funcional con previews (hasta 3 archivos) */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Comprobante de Pago
                </Typography>
                <FileDropzone
                  value={files}
                  onChange={setFiles}
                  maxFiles={3}
                  maxSizeMB={5}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'image/*': ['.png', '.jpg', '.jpeg']
                  }}
                  helperText="Arrastra aquí el comprobante de pago o haz clic para seleccionar"
                />
              </Grid>
            </Grid>

            {/* Botones */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="neutral" onClick={() => navigate('/dashboard')}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#22C55E' }}>
                Guardar
              </Button>
            </Stack>
          </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
