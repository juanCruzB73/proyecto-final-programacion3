import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IProductos } from "../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
import { BackendClient } from "./BackenClient";

export class ProductoService extends BackendClient<IProductos|ICreateProducto|IUpdateProducto>{
    async getAll(): Promise<IProductos[]> {
        const response=await fetch(`${this.baseURL}`);
        const data= await response.json();
        return data as IProductos[];
    }

    async getById(id: number): Promise<IProductos | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as IProductos;        
    }

    async post(data: ICreateProducto): Promise<ICreateProducto | null> {
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
        return newData as ICreateProducto;
    }
    async put(id: number, data: IUpdateProducto): Promise<IUpdateProducto> {
        const response=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await response.json();
        return newData as IUpdateProducto;
    }
};