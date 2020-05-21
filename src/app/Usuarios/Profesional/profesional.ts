import { Usuario } from '../usuario';

export class Profesional extends Usuario{
    public especialidades: Array<string>;

    constructor()
    {
        super();
    }
}
