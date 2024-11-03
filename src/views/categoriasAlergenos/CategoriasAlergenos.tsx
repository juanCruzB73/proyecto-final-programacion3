import './categoriasAlergenos.css'
import { TopBar } from '../../components/categoriasAlergenos/TopBar'
import { SideBar } from '../../components/categoriasAlergenos/SideBar'
import { ListCards } from '../../components/categoriasAlergenos/ListCards'


export const CategoriasAlergenos = () => {
  
  return (
    <div className="main-container-administracion">
      <div className='topBar'>
        <TopBar/>
      </div>
      <div className='board'>

        <div className='sideBar'>
          <SideBar/>
        </div>
        <div className='itemMenu'>
          <div className='Items'>
            <ListCards/>
          </div>
        </div>
      </div>
    </div>
  )
}