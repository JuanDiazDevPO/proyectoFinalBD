export interface Auditoria {
    id:number;
    tablaModificada:string;
    idRegistroModificado:number;
    tipoModificacion:string;
    fechaHoraModificacion:string;
    usuario:string;
    datoAnterior:string;
    datoNuevo:string;
}

