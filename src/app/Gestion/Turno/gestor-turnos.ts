import { Turno } from './turno';
import { ProfesionalJornada } from '../Administracion/JornadaTrabajo/profesional-jornada';
import { Jornada } from '../Administracion/JornadaTrabajo/jornada';

export class GestorTurnos {

    listarTurnosDisponibles(listadoTurnosVivos: Array<Turno>, listadoJornadasTrabajo: Array<ProfesionalJornada>): Array<Turno>
    {
        const diasParaBuscar = 15;

        let output: Array<Turno> = [];        

        let hoy = new Date(Date.now());
        let finBusqueda = new Date(hoy.getTime() + (1000 * 60 * 60 * 24 * diasParaBuscar));

        let diaActual = new Date(hoy.getTime());

        for(let i = 0; i < diasParaBuscar; i++)
        {
            for(let j = 0; j < listadoJornadasTrabajo.length; j++)
            {
                for(let k = 0; k < listadoJornadasTrabajo[j].jornadas.length; k++)
                {
                    console.log("entro");
                    let jornadaActual = listadoJornadasTrabajo[j].jornadas[k];
                    if (jornadaActual.dia != diaActual.getDay())
                    {
                        continue;
                    }

                    // Genero turnos posibles
                    let turnosPosibles = this.generarTurnosPosibles(jornadaActual, listadoJornadasTrabajo[j].id_profesional, diaActual);

                    for(let l = 0; l < turnosPosibles.length; l++)
                    {
                        let turnoPosibleActual = turnosPosibles[l];
                        let guardarTurnoPosibleActual = true;

                        for(let m = 0; m < listadoTurnosVivos.length; m++)
                        {
                            let turnoVivoActual = listadoTurnosVivos[m];

                            if(!this.mismoDia(turnoVivoActual.inicio, diaActual))
                            {
                                continue;
                            }

                            if(this.superposicionTurnos(turnoPosibleActual, turnoVivoActual))
                            {
                                guardarTurnoPosibleActual = false;
                                break;
                            }
                        }

                        if(guardarTurnoPosibleActual)
                        {
                            console.log("Agrego turno");
                            output.push(turnoPosibleActual);
                        }
                    }
                }
            }
            diaActual = new Date(diaActual.getTime() + (1000 * 60 * 60 * 24));
        }
        return output;
    }



    private mismoDia(fecha1: Date, fecha2: Date): boolean
    {
        if(fecha1.getDate() == fecha2.getDate() && fecha1.getMonth() == fecha2.getMonth() && fecha1.getFullYear() == fecha2.getFullYear()) return true;
        else return false;
    }

    // Si los turnos se superponen devuelve True
    private superposicionTurnos(turnoPosible: Turno, turnoVivo: Turno): boolean
    {
        if(turnoPosible.inicio < turnoVivo.fin || turnoPosible.fin > turnoVivo.inicio) return true;
        else return false;
    }

    private generarTurnosPosibles(jornadaTrabajo: Jornada, idProfesional: number, diaActual: Date): Array<Turno>
    {
        let output: Array<Turno> = [];

        let arrayHorario = jornadaTrabajo.horario.split('-');
        let horaInicio = arrayHorario[0].substring(0, 2) as unknown as number;
        let minutosInicio = arrayHorario[0].substring(3, 5) as unknown as number;
        let horaFin = arrayHorario[1].substring(0, 2) as unknown as number;
        let minutosFin = arrayHorario[1].substring(3, 5) as unknown as number;

        let dateInicio = new Date(diaActual.getFullYear(), diaActual.getMonth(), diaActual.getDate(), horaInicio, minutosInicio);
        let dateFin = new Date(diaActual.getFullYear(), diaActual.getMonth(), diaActual.getDate(), horaFin, minutosFin);

        while(true)
        {
            let turnoTermina = new Date(dateInicio.getTime() + (1000 * 60 * jornadaTrabajo.duracion));
            if(turnoTermina > dateFin)
            {
                break;
            }

            let agregoTurno = new Turno();
            agregoTurno.idProfesional = idProfesional;
            agregoTurno.inicio = new Date(dateInicio.getTime());
            agregoTurno.fin = new Date(turnoTermina.getTime());
            agregoTurno.especialidad = jornadaTrabajo.especialidad;
            output.push(agregoTurno);
            
            dateInicio = new Date(dateInicio.getTime() + (1000 * 60 * jornadaTrabajo.duracion));
        }

        return output;
    }
}