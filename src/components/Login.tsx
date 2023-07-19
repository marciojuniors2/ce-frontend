import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, TextField, Button, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'

import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import authService from '../services/auth.service'

const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 numeros.'),
})

const LoginForm = () => {
  const { login, isAuthenticated }: any = useAuth()
  const navigate: any = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const loginSubmit: any = async (data: any) => {
    const log = {
      email: data.email,
      password: parseInt(data.password),
    }
    try {
      toast.loading('Loading...')
      const resp = await authService.AuthLogin(log)
      if (resp.status === 200) {
        login(resp.id, resp.data)
      }

      if (!isAuthenticated) navigate('/')
    } catch (error: any) {
      toast.error('Erro ao fazer login', error)
      toast.dismiss()
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
        marginTop: {
          xs: 13,
        },
      }}
    >
      <form onSubmit={handleSubmit(loginSubmit)}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
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
          Entrar
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm
