import React from 'react'
import { Box } from '@mui/material'
import CardCars from '../components/CardCars'
import { useAuth } from '../hooks/useAuth'
import CreateCar from '../components/CreateCar'
import { useCarsListContext } from '../contexts/CarListContext'

function Cars() {
  const { isAuthenticated }: any = useAuth()
  const { cars }: any = useCarsListContext()

  return (
    <Box sx={{ mt: 10, mx: 15, mb: 15 }}>
      {isAuthenticated && <CreateCar />}

      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(4, 1fr)',
          '@media (max-width: 1100px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media (max-width: 900px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 600px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        }}
      >
        {cars.map((c: any) => (
          <CardCars
            key={c.id}
            id={c.id}
            name={c.name}
            brand={c.brand}
            model={c.model}
            color={c.color}
            year={c.year}
            km={c.km}
            price={c.price}
            imgUrl={c.picture}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Cars
