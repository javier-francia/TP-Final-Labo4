import { Usuario } from '../Usuario/usuario';

export class Admin extends Usuario {
    public superUser: boolean;

    constructor()
    {
        super();
    }
}
