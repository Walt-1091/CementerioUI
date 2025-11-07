import { Stack, TextField, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({ value, onChange, onSubmit }){
  return (
    <Stack direction={{ xs:'column', md:'row' }} spacing={2}>
      <TextField
        fullWidth
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder="Buscar por nombre del difunto o propietario..."
        InputProps={{ endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment> }}
      />
      <Button variant="contained" onClick={onSubmit}>Buscar</Button>
    </Stack>
  )
}
