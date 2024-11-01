import { Navigate, Route,Routes } from 'react-router-dom'
import { Home } from '../views/home/Home'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import { ProtectedRoutes } from './ProtectedRoutes'

export const AppRoutes = () => {

    const {elementActive}=useSelector((state:RootState)=>state.tablaSucursal);


  return (
    <Routes>
        {elementActive?(
            <Route path='/*' element={<ProtectedRoutes/>} />
        ):(
            <Route path='/*' element={<Navigate to="/" replace/>} />
        )
    }
      <Route path='/' element={<Home/>} />
    </Routes>
  )
}
