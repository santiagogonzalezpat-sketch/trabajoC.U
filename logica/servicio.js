const { response } = require("express");

function ejercicio1(array){
  let response = [];
   for(let i=0; i<array.length; i++){
        console.log('--->',array[i].nombre);
        console.log('--->',array[i].nombre);
        return response.push(array[i].nombre);
   }
};





function listarEstudiantes(estudiantes) {

    console.log("===== LISTA DE ESTUDIANTES =====");

    for (let i = 0; i < estudiantes.length; i++) {

        console.log(
            estudiantes[i].id + ". " +
            estudiantes[i].nombre + " - " +
            estudiantes[i].carrera + " - Promedio: " +
            estudiantes[i].promedio
        );
    }
}


function buscarPorId(estudiantes, id) {
    return estudiantes.find(estudiante => estudiante.id === id) || null;
}



function buscarPorCarrera(estudiantes, carrera) {
    let resultados = [];

    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].carrera === carrera) {
            resultados.push(estudiantes[i]);
        }
    }

    return resultados;
}

//2//

function obtenerAprobados(estudiantes) {
    let aprobados = [];

    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].promedio >= 3) {
            aprobados.push(estudiantes[i]);
        }
    }

    return aprobados;
}

//3//

function obtenerReprobados(estudiantes) {
    return estudiantes.filter(estudiante => estudiante.promedio < 3.0);
}


//4//

function calcularPromedioGeneral(estudiantes) {
    if (estudiantes.length === 0) return 0;

    const sumaTotal = estudiantes.reduce((acumulador, alumno) => acumulador + alumno.promedio, 0);
    return sumaTotal / estudiantes.length;
}


//5//

function encontrarMejorEstudiante(estudiantes) {
    if (estudiantes.length === 0) return null;
    return [...estudiantes].sort((a, b) => b.promedio - a.promedio)[0];
}

//6//

function encontrarMenorPromedio(estudiantes) {
    if (estudiantes.length === 0) return null;
    return [...estudiantes].sort((a, b) => a.promedio - b.promedio)[0];
}

//7//

function contarPorCarrera(estudiantes) {
    return estudiantes.reduce((acc, { carrera }) => {
        acc[carrera] = (acc[carrera] || 0) + 1;
        return acc;
    }, {});
}

//8//

function buscarPorSemestre(estudiantes, semestre) {
    return estudiantes.filter(estudiante => estudiante.semestre === semestre);
}

//9//

function obtenerMayoresDeEdad(estudiantes, edad = 18) {
    return estudiantes.filter(estudiante => estudiante.edad >= edad);
}

//10//


function generarReporte(estudiantes) {
    console.log("---------- REPORTE ACADÉMICO ----------\n");

    const total = estudiantes ? estudiantes.length : 0;

    if (total === 0) {
        console.log("No hay datos de estudiantes para generar el reporte.");
        console.log("---------------------------------------");
        return;
    }

    const aprobados = obtenerAprobados(estudiantes);
    const reprobados = obtenerReprobados(estudiantes);
    const promedioGen = calcularPromedioGeneral(estudiantes);
    const mejor = encontrarMejorEstudiante(estudiantes);
    const peor = encontrarMenorPromedio(estudiantes);

    console.log(`Total de estudiantes: ${total}`);
    console.log(`Estudiantes aprobados: ${aprobados.length}`);
    console.log(`Estudiantes reprobados: ${reprobados.length}`);
    console.log(`Promedio general: ${promedioGen.toFixed(2)}`);
    console.log(`Mejor estudiante: ${mejor.nombre} - ${mejor.promedio}`);
    console.log(`Estudiante con menor promedio: ${peor.nombre} - ${peor.promedio}\n`);
    console.log("---------------------------------------");
}


//11//


function rankingPorPromedio(estudiantes = []) {
    const ranking = [...estudiantes].sort((a, b) => b.promedio - a.promedio);

    console.log("----- RANKING -----\n");
    ranking.forEach((estudiante, i) => {
        console.log(`${i + 1}. ${estudiante.nombre} - ${estudiante.promedio}`);
    });
}


//12//

const express = require('express');
const app = express();

app.get('/aprobados/texto', (req, res) => {
    // Generas el texto pasándole la lista de datos
    const respuestaTexto = filtrarPorAprobados(estudiantes);
    
    // Defines el tipo de contenido y envías la respuesta
    res.type('text/plain').send(respuestaTexto);
});



// 1. Cargar o definir los estudiantes
const estudiantes = listarEstudiantes(); 

console.log("..... SISTEMA DE GESTIÓN DE ESTUDIANTES .....\n");

// Listado completo
console.log("--- Listado completo ---");
estudiantes.forEach(e => {
    console.log(`${e.id}. ${e.nombre} - ${e.carrera} - Semestre ${e.semestre} - Promedio ${e.promedio}`);
});

// Búsquedas por ID
console.log("\n--- Buscar por ID 6 ---");
console.log(buscarPorId(estudiantes, 6));

console.log("\n--- Buscar por ID 999 ---");
console.log(buscarPorId(estudiantes, 999));

// Búsqueda por carrera
console.log("\n--- Estudiantes de Ingeniería de Sistemas ---");
const ingenieria = buscarPorCarrera(estudiantes, "Ingeniería de Sistemas");
ingenieria.forEach(e => console.log(` - ${e.nombre}`));

// Conteo por carrera
console.log("\n--- Conteo por carrera ---");
const conteo = contarPorCarrera(estudiantes);
for (const [carrera, cantidad] of Object.entries(conteo)) {
    console.log(`${carrera}: ${cantidad}`);
}

// Mayores de edad
console.log("\n--- Mayores de edad (18 o más) ---");
const mayores = obtenerMayoresDeEdad(estudiantes, 18);
mayores.forEach(e => console.log(` - ${e.nombre} (${e.edad} años)`));

// Reporte y Ranking
console.log("");
generarReporte(estudiantes);

console.log("");
rankingPorPromedio(estudiantes);


//13//


const express = require("express");
const app = express();

// Supongamos que aquí obtienes la lista
const estudiantes = listarEstudiantes(); 

// Ruta raíz
app.get("/", (req, res) => {
    res.type("text/plain").send(
        "Sistema de Gestión de Estudiantes. Rutas disponibles:\n" +
        "/estudiantes, /estudiantes/:id, /estudiantes/carrera/:carrera, " +
        "/aprobados, /reprobados, /promedio-general, /mejor, /peor, " +
        "/conteo-carreras, /semestre/:semestre, /mayores-de-edad, /reporte, /ranking"
    );
});

// Obtener todos los estudiantes
app.get("/estudiantes", (req, res) => res.json(estudiantes));

// Buscar por ID (Devuelve 404 si no existe)
app.get("/estudiantes/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const estudiante = buscarPorId(estudiantes, id);

    if (!estudiante) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    res.json(estudiante);
});

// Buscar por Carrera
app.get("/estudiantes/carrera/:carrera", (req, res) => {
    const resultados = buscarPorCarrera(estudiantes, req.params.carrera);
    res.json(resultados);
});

// Aprobados y Reprobados
app.get("/aprobados", (req, res) => res.json(obtenerAprobados(estudiantes)));
app.get("/reprobados", (req, res) => res.json(obtenerReprobados(estudiantes)));

// Promedio general
app.get("/promedio-general", (req, res) => {
    res.json({ promedioGeneral: Number(calcularPromedioGeneral(estudiantes).toFixed(2)) });
});

// Mejor y Peor estudiante
app.get("/mejor", (req, res) => res.json(encontrarMejorEstudiante(estudiantes)));
app.get("/peor", (req, res) => res.json(encontrarMenorPromedio(estudiantes)));

// Conteo por carreras
app.get("/conteo-carreras", (req, res) => res.json(contarPorCarrera(estudiantes)));

// Buscar por semestre
app.get("/semestre/:semestre", (req, res) => {
    const semestre = parseInt(req.params.semestre, 10);
    res.json(buscarPorSemestre(estudiantes, semestre));
});

// Mayores de edad
app.get("/mayores-de-edad", (req, res) => {
    res.json(obtenerMayoresDeEdad(estudiantes, 18));
});

// Reporte en texto plano
app.get("/reporte", (req, res) => {
    const mejor = encontrarMejorEstudiante(estudiantes);
    const peor = encontrarMenorPromedio(estudiantes);

    const reporte = `---------- REPORTE ACADÉMICO ----------

Total de estudiantes: ${estudiantes.length}
Estudiantes aprobados: ${obtenerAprobados(estudiantes).length}
Estudiantes reprobados: ${obtenerReprobados(estudiantes).length}
Promedio general: ${calcularPromedioGeneral(estudiantes).toFixed(2)}
Mejor estudiante: ${mejor ? `${mejor.nombre} - ${mejor.promedio}` : "N/A"}
Estudiante con menor promedio: ${peor ? `${peor.nombre} - ${peor.promedio}` : "N/A"}

---------------------------------------`;

    res.type("text/plain").send(reporte);
});

// Ranking ordenado
app.get("/ranking", (req, res) => {
    const ranking = [...estudiantes].sort((a, b) => b.promedio - a.promedio);
    res.json(ranking);
});

// Completando la variable cortada al final:
const resumenFunciones = filtrarPorAprobados(estudiantes);