import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
import { BackendClient } from "./BackenClient";

export class CategoriasService extends BackendClient<ICategorias|ICreateCategoria|IUpdateCategoria>{
    async getAll(): Promise<ICategorias[]> {
        const response=await fetch(`${this.baseURL}`);
        const data= await response.json();
        return data as ICategorias[];
    }

    async getById(id: number): Promise<ICategorias | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as ICategorias;        
    }

    async post(data: ICreateCategoria): Promise<ICreateCategoria | null> {
        console.log(data)
        const response=await fetch(`${this.baseURL}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        if (!response.ok) {
            console.error("Failed to post data:", response.statusText);
            return null;
        }
        const newData=await response.json();
        return newData as ICreateCategoria;
    }
    async put(id: number, data: IUpdateCategoria): Promise<IUpdateCategoria> {
        console.log(data);
        
        const response=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to post data:", response.statusText);
            
        }
        const newData=await response.json();
        return newData as IUpdateCategoria;
    }
};