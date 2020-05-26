import { Usuario } from '../Usuario/usuario';

export class Profesional extends Usuario{
    public especialidades: Array<string>;

    constructor()
    {
        super();
    }
}
