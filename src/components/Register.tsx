import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, TextField, Button, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import userService from '../services/user.service'

import { toast } from 'react-hot-toast'

const registerSchema = z.object({
  name: z.string().nonempty('Por favor, insira seu nome.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: any = async (data: {
    name: string
    email: string
    password: number
  }) => {
    try {
      toast.loading('Loading...')

      const res = await userService.CreateUser(data)
      if (res.isSuccess === true)
        return toast.success('usuario criado com sucesso')
    } catch (error: any) {
      toast.error('erro ao Fazer login', error.message)
      toast.dismiss()
    } finally {
      reset()
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Cadastro
        </Typography>
        <TextField
          label="Nome"
          {...register('name', { required: 'Este campo é obrigatório.' })}
          error={!!errors.name}
          helperText={errors.name?.message ? String(errors.name?.message) : ''}
          fullWidth
          margin="normal"
        />
        <TextField
          label="E-mail"
          {...register('email', { required: 'Este campo é obrigatório.' })}
          error={!!errors.email}
          helperText={
            errors.email?.message ? String(errors.email?.message) : ''
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          {...register('password', { required: 'Este campo é obrigatório.' })}
          error={!!errors.password}
          helperText={
            errors.password?.message ? String(errors.password?.message) : ''
          }
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ my: 2 }}
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  )
}

export default RegisterForm
