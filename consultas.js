function consulta1(personajes) {
    return personajes.filter(p => p.estado === "Alive" && p.especie === "Human");
}

function consulta2(personajes) {
    return personajes.filter(p => p.cantidadEpisodios >= 20);
}

function consulta3(personajes) {
    return personajes.find(p => p.especie === "Alien" && p.genero === "Female");
}

function consulta4(personajes) {
    return personajes.some(p => p.tipo && p.tipo.trim() !== "");
}

function consulta5(personajes) {
    return personajes.every(p => p.imagen && p.cantidadEpisodios >= 1);
}

function consulta6(personajes) {
    const agrupado = personajes.reduce((acc, p) => {
        const especie = p.especie;
        if (!acc[especie]) {
            acc[especie] = { cantidad: 0, totalEpisodios: 0, vivos: 0 };
        }
        acc[especie].cantidad++;
        acc[especie].totalEpisodios += p.cantidadEpisodios;
        if (p.estado === "Alive") {
            acc[especie].vivos++;
        }
        return acc;
    }, {});

    return Object.keys(agrupado).reduce((acc, especie) => {
        const data = agrupado[especie];
        acc[especie] = {
            cantidad: data.cantidad,
            promedioEpisodios: Number((data.totalEpisodios / data.cantidad).toFixed(1)),
            vivos: data.vivos
        };
        return acc;
    }, {});
}

function consulta7(personajes) {
    return personajes.reduce((acc, p) => {
        const total = p.cantidadEpisodios;
        if (total >= 1 && total <= 5) {
            acc["1-5"]++;
        } else if (total >= 6 && total <= 15) {
            acc["6-15"]++;
        } else if (total >= 16 && total <= 30) {
            acc["16-30"]++;
        } else if (total > 30) {
            acc["30+"]++;
        }
        return acc;
    }, {
        "1-5": 0,
        "6-15": 0,
        "16-30": 0,
        "30+": 0
    });
}

function ejecutarConsultas(personajes) {
    console.log("\n--- Consultas ---");
    console.log("1. Humanos vivos:", consulta1(personajes).length);
    console.log("2. Personajes en 20 o mas episodios:", consulta2(personajes).length);
    console.log("3. Primer alien femenino:", consulta3(personajes));
    console.log("4. Existe personaje con tipo:", consulta4(personajes));
    console.log("5. Todos tienen imagen y episodios:", consulta5(personajes));
    console.log("6. Agrupacion por especie:\n", consulta6(personajes));
    console.log("7. Clasificacion por episodios:\n", consulta7(personajes));
}

module.exports = {
    consulta1,
    consulta2,
    consulta3,
    consulta4,
    consulta5,
    consulta6,
    consulta7,
    ejecutarConsultas
};
