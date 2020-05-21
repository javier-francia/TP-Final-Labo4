import { Usuario } from '../usuario';

export class Admin extends Usuario {
    public superUser: boolean;

    constructor()
    {
        super();
    }
}
