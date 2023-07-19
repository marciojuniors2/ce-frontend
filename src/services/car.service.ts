import axios from 'axios'

export const base = axios.create({
  baseURL: 'https://localhost:44302/api/',
})

class CarService {
  async GetCars() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    return await base.get('Car', config).then((res) => res.data.result)
  }

  async CreateCars(data: any) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    try {
      const res = await base.post('Car', data, config).then((res) => res.data)
      return res
    } catch (error) {
      return error
    }
  }

  async DeleteCar(id: any) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    try {
      return await base.delete(`Car/${id}`, config).then((res) => res.data)
    } catch (error) {
      return error
    }
  }

  async UpdateCar(id: any, data: any) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    try {
      console.log(data)
      return await base.put(`Car/${id}`, data, config).then((res) => res.data)
    } catch (error) {
      return error
    }
  }
}

export default new CarService()
