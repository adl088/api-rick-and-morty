const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function obtenerPagina(url, intentos = 6, esperaMs = 1500) {
    try {
        const res = await fetch(url);
        if (res.ok) {
            return await res.json();
        }
        if (res.status === 429 && intentos > 0) {
            await sleep(esperaMs);
            return obtenerPagina(url, intentos - 1, esperaMs * 1.5);
        }
        throw new Error(`Error ${res.status} al consultar ${url}`);
    } catch (err) {
        if (intentos > 0) {
            await sleep(esperaMs);
            return obtenerPagina(url, intentos - 1, esperaMs * 1.5);
        }
        throw err;
    }
}

async function obtenerPersonajesSecuencial(apiUrl, totalPaginas) {
    console.log("Consultando secuencial...");
    const inicio = Date.now();
    const paginas = [];

    for (let i = 1; i <= totalPaginas; i++) {
        const data = await obtenerPagina(`${apiUrl}?page=${i}`);
        paginas.push(data);
    }

    const fin = Date.now();
    const tiempoMs = fin - inicio;
    const personajes = paginas.reduce((acc, pag) => acc.concat(pag.results), []);

    return { personajes, tiempoMs };
}

async function obtenerPersonajesConcurrente(apiUrl, totalPaginas) {
    console.log("Consultando concurrente...");
    const inicio = Date.now();

    const urls = Array.from({ length: totalPaginas }, (_, i) => `${apiUrl}?page=${i + 1}`);
    const respuestas = await Promise.all(urls.map(url => obtenerPagina(url)));

    const fin = Date.now();
    const tiempoMs = fin - inicio;
    const personajes = respuestas.reduce((acc, pag) => acc.concat(pag.results), []);

    return { personajes, tiempoMs };
}

async function compararEstrategias(apiUrl, totalPaginas) {
    console.log("\n--- Comparacion de Estrategias ---");
    const secuencial = await obtenerPersonajesSecuencial(apiUrl, totalPaginas);
    console.log(`Secuencial: ${secuencial.tiempoMs} ms`);

    const concurrente = await obtenerPersonajesConcurrente(apiUrl, totalPaginas);
    console.log(`Concurrente: ${concurrente.tiempoMs} ms`);

    console.log(`Diferencia: ${secuencial.tiempoMs - concurrente.tiempoMs} ms`);
}

module.exports = {
    obtenerPagina,
    obtenerPersonajesSecuencial,
    obtenerPersonajesConcurrente,
    compararEstrategias
};
