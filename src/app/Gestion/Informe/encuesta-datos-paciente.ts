export class EncuestaDatosPaciente {
    edad: number;
    // en metros
    altura: number;
    // en kg
    peso: number;
    // 13/7
    presionArterial: string;
    // ["clave":"caries", "valor":"4" ]
    datosPersonalizados: Array<string>;
}
