import { NextPage } from 'next'
import LoginPage from 'src/views/pages/login'

type TProps = {}
const login: NextPage<TProps> = () => {
  return <LoginPage />
}
export default login
