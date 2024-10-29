import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal"
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { BackendClient } from "./BackenClient";

export class SucursalService extends BackendClient<ICreateSucursal>{};