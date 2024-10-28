export abstract class AbstractBackendClient<T> {
    
    protected baseURL:string;
    
    constructor(baseURL:string) {
        this.baseURL=baseURL;
    }

    abstract getAll():Promise<T[]>
    abstract getById(id:number):Promise<T | null>
    abstract post(data:T):Promise<T|null>;
    abstract put(id:number,data:T):Promise<T>;
    //abstract delete(id:number):Promise<void>;

}