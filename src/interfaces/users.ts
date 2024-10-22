//get, put, delete

export interface Users{
    id?: string;  // Hacemos que el campo 'id' sea opcional para que el json lo genere automaticamente
    rut: string;
    username:string;
    email:string;
    password:string;
    carrera:string;
    jornada:string;
    seccion:string;
    isactive:boolean;

}