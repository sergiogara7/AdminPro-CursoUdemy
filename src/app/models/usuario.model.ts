export class Usuario{

    constructor(
        public nombre: string,
        public apellido: string,
        public contrasena: string,
        public correo: string,
        public img?: string,
        public rol?: string,
        public google?: boolean,
        public _id?: string
    ){}
}