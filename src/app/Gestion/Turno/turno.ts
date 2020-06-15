
import { EncuestaDatosProfesional } from '../Encuesta/encuesta-datos-profesional';
import { EncuestaDatosPaciente } from '../Informe/encuesta-datos-paciente';

export class Turno {
    id: number;
    idPaciente: number;
    idProfesional: number;
    especialidad: string;
    inicio: Date;
    fin: Date;
    estado: string;
    resenia: string;
    datosPaciente: EncuestaDatosPaciente;
    datosProfesional: EncuestaDatosProfesional;
}

/*
    Estados de turnos:
    Pendiente
    Confirmado
    Rechazado
    Cancelado
    Finalizado

*/