import { Jornada } from './jornada';

export class ProfesionalJornada {
    id_profesional: number;
    inicio: Date;
    jornadas: Array<Jornada>;

    constructor()
    {
        this.jornadas = [];
    }
}
