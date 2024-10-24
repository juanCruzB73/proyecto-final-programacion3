import { FC } from "react"

interface Props{
    name:string
}

export const AddComponent:FC<Props> = ({name}) => {
  return (
    <div className="agregar">
      <h2>{name}</h2>
      <button>{`Agregar ${name}`}</button>
    </div>
  )
}
