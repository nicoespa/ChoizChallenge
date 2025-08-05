import {Question} from "@/types/form"

export const questions: Question[] = [
    {
        id: "q1",
        question: "¿Tienes algún problema en el cuero cabelludo?",
        type:"multiple",
        options:["Dolor repentino y/o enrojecimiento","Caspa","Psoriasis","Quemadura de sol","Otro","No, ninguno de los anteriores"],
        required: true,
        helper: "Selecciona todas las opciones que apliquen."
    },
    {
        id: "q2",
        question:"¿Hay antecedentes de caída del cabello en tu familia?",
        type:"single",
        options:["No","Sí","No estoy seguro"],
        required: true,
        helper: "Selecciona una opción."
    },
    {
        id: "q3",
        question:"¿Tienes o has tenido alguna de las siguientes condiciones médicas?",
        type:"multiple",
        options:["Cáncer de mama","Cáncer de próstata","Presión arterial baja incontrolada","Otras enfermedades autoinmunes o reumáticas","Problemas de tiroides","Enfermedades del corazón","Enfermedades de riñón o hígado","No, ninguna de las anteriores"],
        required: true,
        helper: "Selecciona todas las opciones que apliquen."
    },
    {
        id: "q4",
        question:"¿Tienes o has tenido alguna de estas condiciones de salud mental?",
        type:"multiple",
        options:["Depresión","Desorden de bipolaridad","Ansiedad","Ataques de pánico","Problemas de tiroides","Desorden de estrés postraumático","Esquizofrenia","No, ninguna de las anteriores"],
        required: true,
        helper: "Selecciona todas las opciones que apliquen."
    }
]