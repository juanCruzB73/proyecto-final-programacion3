import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal"
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackenClient";

export class SucursalService extends BackendClient<ICreateSucursal>{
    async post(data: ICreateSucursal): Promise<ICreateSucursal | null> {
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
        return newData as ICreateSucursal;
    }
    async put(id: number, data: IUpdateSucursal): Promise<IUpdateSucursal> {
        const response=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await response.json();
        return newData as IUpdateSucursal;
    }
};