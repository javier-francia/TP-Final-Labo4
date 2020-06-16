import { Jornada } from './jornada';

export class ProfesionalJornada {
    id: number;
    id_profesional: number;
    nombreCompleto: string;
    jornadas: Array<Jornada>;

    constructor()
    {
        this.jornadas = [];
    }
}
