import { HomeSideVar } from '../../components/HomeSideVar'
import { SucursalesMenu } from '../../components/SucursalesMenu'
import  './home.css'
//view home con sucursales y empresas
export const Home = () => {
  return (
    <div className="main-container">
      <div className="empresa-container">
          <HomeSideVar/> 
      </div>
      <div className="sucursales-container">
          <SucursalesMenu/>
      </div>
    </div>
  )
}
