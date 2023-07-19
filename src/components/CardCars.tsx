import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone'

import { toast } from 'react-hot-toast'
import carService from '../services/car.service'

import { useAuth } from '../hooks/useAuth'
import { useCarsListContext } from '../contexts/CarListContext'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CreateIcon from '@mui/icons-material/Create'
import { convertToBase64 } from '../utils/convertBase64'

interface CarProps {
  id: number
  name: string
  brand: string
  model: string
  year: number
  color: string
  km: string
  imgUrl: string
  price: string
}

function CardCars({
  id,
  name,
  brand,
  model,
  year,
  color,
  km,
  imgUrl,
  price,
}: CarProps) {
  const { isAuthenticated }: any = useAuth()
  const { refreshCars }: any = useCarsListContext()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [nameValue, setNameValue] = useState<string>(name)
  const [brandValue, setBrandValue] = useState<string>(brand)
  const [modelValue, setModelValue] = useState<string>(model)
  const [priceValue, setPriceValue] = useState<number>(Number(price))
  const [kmValue, setKmValue] = useState<number>(Number(km))
  const [yearValue, setYearValue] = useState<number>(Number(year))
  const [colorValue, setColorValue] = useState<string>(color)

  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          style={{ maxHeight: 200, maxWidth: 200, objectFit: 'contain' }}
          src={file.preview}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  const remove = async () => {
    try {
      await carService.DeleteCar(id).then((resp) => resp.isSuccess === true)
      refreshCars()
      return toast.success('removido com sucesso!')
    } catch (error: any) {
      toast.error('erro ao remover', error)
    }
  }

  const onSubmit = async () => {
    const picture = await convertToBase64(files[0])
    const update = {
      name: nameValue,
      brand: brandValue,
      model: modelValue,
      price: priceValue,
      km: kmValue,
      year: yearValue,
      color: colorValue,
      picture,
    }
    try {
      console.log(update)
      const res = await carService.UpdateCar(id, update)
      console.log(res)
      refreshCars()
      if (res.isSuccess === true)
        return toast.success('carro editado com sucesso')
    } catch (error: any) {
      toast.error('erro ao editar', error)
    }
  }

  const style = {
    position: 'absolute',
    display: 'flex',
    gap: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Card
      sx={{
        marginTop: '1rem',
        backgroundColor: '#f1f1f1',
        width: 300,
      }}
    >
      <CardMedia component="img" height="140" image={imgUrl} />
      <CardContent>
        <Typography gutterBottom variant="caption" component="div">
          {brand} | {model}
        </Typography>
        <Typography>{name}</Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          {year} • {color} • {km} km
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: '#b92f35',
          }}
        >
          R$ {price}
        </Typography>
        {isAuthenticated && (
          <>
            <IconButton onClick={() => remove()}>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton onClick={() => handleOpen()}>
              <CreateIcon />
            </IconButton>
          </>
        )}
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  rowGap: 4,
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  '@media (max-width: 900px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  },
                  '@media (max-width: 600px)': {
                    gridTemplateColumns: 'repeat(1, 1fr)',
                  },
                }}
              >
                <TextField
                  label="Name"
                  sx={{ width: '100px' }}
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
                <TextField
                  label="Brand"
                  sx={{ width: '100px' }}
                  value={brandValue}
                  onChange={(e) => setBrandValue(e.target.value)}
                />
                <TextField
                  label="Model"
                  sx={{ width: '100px' }}
                  value={modelValue}
                  onChange={(e) => setModelValue(e.target.value)}
                />
                <TextField
                  label="Price"
                  type="number"
                  sx={{ width: '100px' }}
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                ></TextField>
                <TextField
                  label="Km"
                  type="number"
                  sx={{ width: '100px' }}
                  value={kmValue}
                  onChange={(e) => setKmValue(Number(e.target.value))}
                ></TextField>
                <TextField
                  label="Year"
                  type="number"
                  sx={{ width: '100px' }}
                  value={yearValue}
                  onChange={(e) => setYearValue(Number(e.target.value))}
                ></TextField>
                <TextField
                  label="Color"
                  sx={{ width: '100px' }}
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                ></TextField>
                <Button
                  onClick={() => onSubmit()}
                  color="success"
                  variant="contained"
                  sx={{ width: '100px' }}
                >
                  SALVAR
                </Button>
              </Box>

              <Box
                {...getRootProps({ className: 'dropzone' })}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1px solid black',
                  borderStyle: 'dotted',
                  width: '100%',
                  height: '100%',
                }}
              >
                <input {...getInputProps()} />
                <p>Arraste ou click para inserir uma imagem </p>
                <aside>{thumbs}</aside>
              </Box>
            </Box>
          </Modal>
        )}
      </CardContent>
    </Card>
  )
}

export default CardCars
