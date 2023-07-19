import { base } from './car.service'

class UserService {
  async CreateUser(data: any) {
    try {
      const res = await base.post('User', data).then((resp) => resp.data)
      return res
    } catch (error) {
      return error
    }
  }
}

export default new UserService()
