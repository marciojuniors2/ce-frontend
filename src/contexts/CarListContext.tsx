import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import carService from '../services/car.service'

interface Props {
  children?: ReactNode
}

interface CarsListContextState {
  cars: any[]
  refreshCars: () => void
}

const CarsListContext = createContext<CarsListContextState | undefined>(
  undefined,
)

export const useCarsListContext = () => {
  const context = useContext(CarsListContext)
  if (!context) {
    throw new Error(
      'useCarsListContext useLogin deve ser usado dentro de um CarlistProvider',
    )
  }
  return context
}

export const CarsListContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const [cars, setCars] = useState<any[]>([])

  const refreshCars = async () => {
    const fetchedCars = await carService.GetCars()
    setCars(fetchedCars)
  }

  useEffect(() => {
    refreshCars()
  }, [])

  const value: CarsListContextState = {
    cars,
    refreshCars,
  }

  return (
    <CarsListContext.Provider value={value}>
      {children}
    </CarsListContext.Provider>
  )
}
