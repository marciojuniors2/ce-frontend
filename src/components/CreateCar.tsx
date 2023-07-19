import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z, object } from 'zod'

import { toast } from 'react-hot-toast'
import carService from '../services/car.service'
import { useCarsListContext } from '../contexts/CarListContext'
import { convertToBase64 } from '../utils/convertBase64'

const carSchema = object({
  name: z.string().nonempty(),
  brand: z.string().min(2),
  model: z.string().min(2),
  year: z.number().int().min(1900),
  price: z.number().int().min(0),
  km: z.number().int().min(0),
  color: z.string().nonempty(),
  picture: z.string().refine((value) => value !== '', {
    message: 'A imagem é obrigatória',
  }),
})

function CreateCar() {
  const [open, setOpen] = useState(false)
  const { refreshCars }: any = useCarsListContext()
  const [picture, setPicture] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const openForm = () => {
    setOpen(!open)
  }

  const onSubmit = async (data: any) => {
    const convertedData = {
      ...data,
      year: parseInt(data.year),
      price: parseInt(data.price),
      km: parseInt(data.km),
      picture: await convertToBase64(picture[0]),
    }
    const formData = carSchema.parse(convertedData)

    try {
      const res = await carService.CreateCars(formData)
      refreshCars()
      if (res.isSuccess === true)
        return toast.success('carro adicionado com sucesso')
    } catch (error: any) {
      toast.error('erro ao criar carro', error)
    } finally {
      reset()
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 3 }}
        onClick={openForm}
      >
        Adicionar um Veículo
      </Button>
      {open && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              borderRadius: 2,
              mb: 8,
              paddingX: 4,
              paddingTop: 2,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(4, 1fr)',
              overflow: 'auto',
              overflowX: 'hidden',
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
            <TextField
              label="Nome"
              sx={{ width: '250px' }}
              {...register('name', { required: true })}
              error={!!errors.name}
              helperText={
                errors.name?.message ? String(errors.name?.message) : ''
              }
            />
            <TextField
              label="Marca"
              sx={{ width: '250px' }}
              {...register('brand', { minLength: 4 })}
              error={!!errors.brand}
              helperText={
                errors.brand?.message ? String(errors.brand?.message) : ''
              }
            />
            <TextField
              label="Modelo"
              sx={{ width: '250px' }}
              {...register('model', { minLength: 4 })}
              error={!!errors.model}
              helperText={
                errors.model?.message ? String(errors.model?.message) : ''
              }
            />
            <TextField
              label="Ano"
              type="number"
              sx={{ width: '250px' }}
              {...register('year', { required: true, min: 1900 })}
              error={!!errors.year}
              helperText={
                errors.year?.message ? String(errors.year?.message) : ''
              }
            />
            <TextField
              label="Km"
              type="number"
              sx={{ width: '250px' }}
              {...register('km', { required: true, min: 0 })}
              error={!!errors.km}
              helperText={errors.km?.message ? String(errors.km?.message) : ''}
            />
            <TextField
              label="Preço"
              type="number"
              sx={{ width: '250px' }}
              {...register('price', { required: true, min: 0 })}
              error={!!errors.price}
              helperText={
                errors.price?.message ? String(errors.price?.message) : ''
              }
            />
            <TextField
              label="Cor"
              sx={{ width: '250px' }}
              {...register('color', { required: true })}
              error={!!errors.color}
              helperText={
                errors.color?.message ? String(errors.color?.message) : ''
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPicture(e.target.files ? [e.target.files[0]] : [])
              }
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ my: 2, width: '250px' }}
            >
              Salvar
            </Button>
          </Box>
        </form>
      )}
    </>
  )
}

export default CreateCar
