import React, { FC } from "react"
import Swal from "sweetalert2";
import { IImagen } from "../types/IImagen";
import { ImageService } from "../services/ImageService";
import { Button } from "react-bootstrap";
import noImage from "../assets/images/noImage.jpg"

interface IUploadImage {
    image?: string | null; // URL de la imagen cargada, opcional
    setImage?: (image: string | null) => void; // Función para actualizar la imagen cargada
    imageObjeto?: IImagen | null; // Objeto de tipo IImagen que representa la imagen cargada
    setImageObjeto?: (image: IImagen | null) => void; // Función para actualizar el objeto de imagen
    typeElement?: string; // Tipo de elemento que se utilizará al eliminar la imagen
  }

export const UploadImage:FC<IUploadImage> = ({
    image,
    setImage,
    imageObjeto,
    setImageObjeto,
    typeElement,
}) => {

    const imageService=new ImageService("http://190.221.207.224:8090/images");

    const handleFileChange=async(event: React.ChangeEvent<HTMLInputElement>)=>{
        console.log("ghgh")

        if (event.target.files && event.target.files.length > 0){
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("uploads", file); // Agregamos el archivo al FormData para enviarlo  
        
            // Muestra un mensaje de carga con SweetAlert2
            Swal.fire({
            title: "Subiendo...",
            didOpen: () => {
            Swal.showLoading(); // Activa el icono de carga
        },
      });
      try {
        // Subimos la imagen utilizando el servicio y obtenemos la URL de la imagen cargada
        const data = await imageService.uploadImage(formData);
        console.log(data);
        
        // Si setImage está definido, actualizamos la URL de la imagen cargada
        if (setImage) {
          setImage(data);
        }

        // Si setImageObjeto está definido, actualizamos el objeto de imagen con la URL y el nombre del archivo
        if (setImageObjeto) {
          setImageObjeto({
            url: data,
            name: file.name,
          });
        }
      } catch (error) {
        console.log(error); // En caso de error, lo mostramos en la consola
      }

      Swal.close(); // Cerramos el mensaje de carga
    }
  };
        

  return (
    <div
    style={{
      width: "22vw",
      border: "1px solid #ccc",
      borderRadius: ".4rem",
      padding: ".4rem",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* Si hay una imagen cargada, mostramos la vista con la imagen y el botón para eliminarla */}
    {image || imageObjeto ? (
      <div
        style={{
          borderRadius: ".4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: ".4rem",
        }}
      >
        <div style={{ width: "10vw" }}>
          <Button>
            Eliminar imagen
          </Button>
        </div>
        <img
          src={imageObjeto ? imageObjeto.url : image!} // Muestra la imagen desde el objeto o URL
          alt="Uploaded"
          style={{
            backgroundColor: "#ccc",
            width: "10vw",
            borderRadius: ".4rem",
            height: "10vh",
            objectFit: "fill",
          }}
        />
      </div>
    ) : (
      <>
        {/* Si no hay imagen cargada, mostramos el input para seleccionar una nueva imagen */}
        <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
            <Button variant="outline-primary" as="span">
                Elige una imagen
            </Button>
        </label>
        <div>
          <img
            src={noImage} // Muestra una imagen de reemplazo si no hay imagen cargada
            alt="Uploaded"
            style={{ maxWidth: "3rem", height: "2rem" }}
          />
        </div>
      </>
    )}
  </div>
  )
}