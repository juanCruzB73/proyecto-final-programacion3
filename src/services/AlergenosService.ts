import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackenClient";

export class AlergenosService extends BackendClient<IAlergenos|ICreateAlergeno|IUpdateAlergeno>{
    
    async getAll(): Promise<IAlergenos[]> {
        const response=await fetch(`${this.baseURL}`);
        const data = await response.json();
        return data as IAlergenos[];
    }

    async getById(id: number): Promise<IAlergenos | null> {
        const response=await fetch(`${this.baseURL}/${id}`);
        if(!response.ok){
            return null;
        }
        const data=await response.json();
        return data as IAlergenos;        
    }

    async post(data: ICreateAlergeno): Promise<ICreateAlergeno | null> {
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
        return newData as ICreateAlergeno;
    }
    async put(id: number, data: IUpdateAlergeno): Promise<IUpdateAlergeno> {
        const response=await fetch(`${this.baseURL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const newData=await response.json();
        return newData as IUpdateAlergeno;
    }
};