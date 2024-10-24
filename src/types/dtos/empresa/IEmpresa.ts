import { IPais } from "../../IPais";

import { ISucursal } from "../sucursal/ISucursal";
export interface IEmpresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuit: number;
  logo: string | null;
  sucursales: ISucursal[];
  pais: IPais;
}
