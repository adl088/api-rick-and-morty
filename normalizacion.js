function normalizarPersonajes(personajes) {
    return personajes.map(personaje => ({
        id: personaje.id,
        nombre: personaje.name,
        estado: personaje.status,
        especie: personaje.species,
        tipo: personaje.type || "",
        genero: personaje.gender,
        origen: personaje.origin ? personaje.origin.name : "unknown",
        ubicacionActual: personaje.location ? personaje.location.name : "unknown",
        cantidadEpisodios: Array.isArray(personaje.episode) ? personaje.episode.length : 0,
        imagen: personaje.image || ""
    }));
}

module.exports = {
    normalizarPersonajes
};
