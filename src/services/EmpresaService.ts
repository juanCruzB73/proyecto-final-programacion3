import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { BackendClient } from "./BackenClient";

export class EmpresaService extends BackendClient<ICreateEmpresaDto>{};