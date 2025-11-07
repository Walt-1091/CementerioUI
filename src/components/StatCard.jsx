import { Card, CardContent, Typography } from '@mui/material'

export default function StatCard({ title, value }){
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center" color="primary" sx={{ fontWeight: 800 }}>{value}</Typography>
        <Typography align="center" color="text.secondary">{title}</Typography>
      </CardContent>
    </Card>
  )
}
