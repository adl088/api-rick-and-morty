const API_URL = "https://rickandmortyapi.com/api/character";
const { normalizarPersonajes } = require("./normalizacion");
const { ejecutarConsultas } = require("./consultas");
const { obtenerPagina, obtenerPersonajesConcurrente, compararEstrategias } = require("./estadisticas");

async function main() {
    try {
        const infoInicial = await obtenerPagina(API_URL);
        const totalPaginas = infoInicial.info.pages;

        console.log(`Total paginas: ${totalPaginas}`);
        console.log(`Total personajes: ${infoInicial.info.count}`);

        const { personajes, tiempoMs } = await obtenerPersonajesConcurrente(API_URL, totalPaginas);
        console.log(`Tiempo de descarga: ${tiempoMs} ms`);

        const normalizados = normalizarPersonajes(personajes);
        console.log("\nEjemplo normalizado:");
        console.log(normalizados[0]);

        ejecutarConsultas(normalizados);

        if (process.argv.includes("--comparar")) {
            await compararEstrategias(API_URL, totalPaginas);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();