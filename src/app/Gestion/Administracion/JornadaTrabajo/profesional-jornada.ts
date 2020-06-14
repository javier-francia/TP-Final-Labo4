import { Jornada } from './jornada';

export class ProfesionalJornada {
    id_profesional: number;
    jornadas: Array<Jornada>;

    constructor()
    {
        this.jornadas = [];
    }
}
