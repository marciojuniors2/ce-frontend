import { base } from './car.service'

class AuthService {
  async AuthLogin(data: any) {
    try {
      const res = await base.post('Auth', data)
      return res
    } catch (error: any) {
      return error.message
    }
  }
}

export default new AuthService()
