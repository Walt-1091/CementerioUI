import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box, Stack, Typography, Chip, IconButton, Tooltip, Alert, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function bytesToSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

// Convierte File[] en [{file, previewUrl}]
function withPreviews(files) {
  return files.map((f) => ({
    file: f,
    previewUrl: f.type.startsWith('image/')
      ? URL.createObjectURL(f)
      : null
  }));
}

export default function FileDropzone({
  value = [],                 // [{file, previewUrl}]  ó [] (solo File) — soportamos ambos
  onChange,                   // callback(nextFiles: Array<{file, previewUrl}>)
  accept = {
    'application/pdf': ['.pdf'],
    'image/*': ['.png', '.jpg', '.jpeg']
  },
  maxSizeMB = 5,
  maxFiles = 3,
  helperText = 'Arrastra aquí el comprobante de pago o haz clic para seleccionar'
}) {
  const [errors, setErrors] = React.useState([]);

  // Normaliza a [{file, previewUrl}]
  const normalized = React.useMemo(() => {
    if (!value?.length) return [];
    if (value[0]?.file) return value;
    return withPreviews(value); // si vino como File[]
  }, [value]);

  // Limpieza de objectURLs cuando cambie la lista o al desmontar
  React.useEffect(() => {
    return () => {
      normalized.forEach((it) => it.previewUrl && URL.revokeObjectURL(it.previewUrl));
    };
  }, [normalized]);

  const emit = (files /* File[] */) => {
    const next = withPreviews(files);
    onChange?.(next);
  };

  const onDrop = React.useCallback((acceptedFiles, fileRejections) => {
    const newErrors = fileRejections.map(r => {
      const reasons = r.errors.map(e => e.message).join(', ');
      return `Archivo "${r.file.name}": ${reasons}`;
    });

    let current = normalized.map(n => n.file);
    let next = current.concat(acceptedFiles);
    if (next.length > maxFiles) {
      newErrors.push(`Máximo ${maxFiles} archivos.`);
      next = next.slice(0, maxFiles);
    }

    setErrors(newErrors);
    emit(next);
  }, [normalized, maxFiles]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxFiles,
      maxSize: maxSizeMB * 1024 * 1024,
      multiple: maxFiles > 1
    });

  const removeAt = (idx) => {
    const next = normalized.filter((_, i) => i !== idx).map(n => n.file);
    emit(next);
  };

  return (
    <Stack spacing={1.5}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragReject ? 'error.main' : (isDragActive ? 'secondary.main' : '#D1D5DB'),
          bgcolor: isDragActive ? 'rgba(59,130,246,0.04)' : 'transparent',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all .15s ease-in-out'
        }}
      >
        <input {...getInputProps()} />
        <Stack alignItems="center" spacing={1}>
          <UploadFileIcon />
          <Typography color="text.secondary">{helperText}</Typography>
          <Typography variant="caption" color="text.secondary">
            Extensiones: PDF, JPG, PNG · Máx {maxSizeMB}MB · Hasta {maxFiles} archivo(s)
          </Typography>
        </Stack>
      </Box>

      {/* Previews */}
      {normalized.length > 0 && (
        <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
          {normalized.map((item, idx) => {
            const f = item.file;
            const isImg = !!item.previewUrl;
            return (
              <Stack
                key={f.name + idx}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  border: '1px solid #E5E7EB',
                  borderRadius: 1.5,
                  p: 1,
                  minWidth: 260,
                }}
              >
                {isImg ? (
                  <Avatar
                    variant="rounded"
                    src={item.previewUrl}
                    alt={f.name}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    sx={{ width: 56, height: 56, bgcolor: 'error.light' }}
                  >
                    <PictureAsPdfIcon />
                  </Avatar>
                )}

                <Stack flex={1} minWidth={0}>
                  <Typography noWrap title={f.name}>{f.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={f.type?.split('/')[1] || 'archivo'} size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {bytesToSize(f.size)}
                    </Typography>
                  </Stack>
                </Stack>

                <Tooltip title="Eliminar">
                  <IconButton size="small" onClick={() => removeAt(idx)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          })}
        </Stack>
      )}

      {/* Errores */}
      {errors.map((e, i) => (
        <Alert key={i} severity="error" variant="outlined">{e}</Alert>
      ))}
    </Stack>
  );
}
