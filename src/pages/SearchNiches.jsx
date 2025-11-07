import * as React from 'react'
import {
  Card, CardContent, Typography, Stack, List, ListItem, ListItemText,
  Button, Pagination, Divider, Chip
} from '@mui/material'
import SearchBar from '../components/SearchBar.jsx'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { mockNiches } from '../data.js'
import { Link as RouterLink } from 'react-router-dom'


export default function SearchNiches(){
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState([])
  const [page, setPage] = React.useState(1)

  const PAGE_SIZE = 5 // <- cambia aquí el tamaño de página

  const onSubmit = ()=>{
    const q = query.trim().toLowerCase()
    const filtered = mockNiches.filter(n =>
      n.deceased.toLowerCase().includes(q) ||
      n.owner.toLowerCase().includes(q) ||
      String(n.number).toLowerCase().includes(q)
    )
    setResults(filtered)
    setPage(1) // reset a la primera página en cada búsqueda
  }

  // datos de la página actual
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const end   = start + PAGE_SIZE
  const pageData = results.slice(start, end)

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Consultar Nichos</Typography>
        <Button startIcon={<ArrowBackIcon/>} component={RouterLink} to="/" variant="outlined">
          Volver al Inicio
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <SearchBar value={query} onChange={setQuery} onSubmit={onSubmit} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6">Resultados de Búsqueda</Typography>
            {!!results.length && (
              <Chip label={`${results.length} resultado${results.length!==1?'s':''}`} />
            )}
          </Stack>
          <Divider sx={{ mb: 2 }} />

          {results.length === 0 ? (
            <Typography color="text.secondary">Sin resultados.</Typography>
          ) : (
            <>
              <List>
                {pageData.map(r => (
                  <ListItem
                    key={r.id}
                    secondaryAction={
                      <Button
                        component={RouterLink}
                        to={`/niches/${r.id}`}
                        variant="contained"
                        size="small"
                      >
                        Ver
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={r.deceased}
                      secondary={
                        <span>
                          <strong>Propietario:</strong> {r.owner}<br/>
                          <strong>Nicho:</strong> {r.number}&nbsp;&nbsp;
                          <strong>Última Anualidad:</strong>{' '}
                          {new Date(r.lastPayment).toLocaleDateString()}
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {/* Paginación */}
              <Stack alignItems="center" sx={{ mt: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, p) => setPage(p)}
                  color="primary"
                  shape="rounded"
                />
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}
