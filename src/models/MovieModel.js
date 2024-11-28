const db = require('../config/database');

// insertar una pelicula en la base de datos

const createMovieModel = async(movie)=>{
    const query = `
    INSERT INTO peliculas (
      titulo, titulo_original, director, anio, sinopsis, imagen_url, duracion, 
      pais, rating_promedio, trailer_url, fecha_estreno, usuario_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        movie.titulo,
        movie.titulo_original || null,
        movie.director || null,
        movie.anio || null,
        movie.sinopsis || null,
        movie.imagen_url || null,
        movie.duracion || null,
        movie.pais || null,
        movie.rating_promedio || 0,
        movie.trailer_url || null,
        movie.fecha_estreno || null,
        movie.usuario_id || null,
    ];

    const [result] = await db.execute(query, values);
    return result;
}

//findMovieByFiltersModel
// Obtener las películas de la base de datos por id
const findMovieByFiltersModel = async (filters) => {
    try {
      // Construcción dinámica de la consulta
      let query = 'SELECT * FROM peliculas';
      const values = [];
      const conditions = [];
  
      // Verificar y agregar filtros dinámicamente
      if (filters.id) {
        conditions.push('id = ?');
        values.push(filters.id);
      }
      if (filters.titulo) {
        conditions.push('titulo LIKE ?');
        values.push(`%${filters.titulo}%`);
      }
      if (filters.titulo_original) {
        conditions.push('titulo_original LIKE ?');
        values.push(`%${filters.titulo_original}%`);
      }
      if (filters.director) {
        conditions.push('director LIKE ?');
        values.push(`%${filters.director}%`);
      }
      if (filters.anio) {
        conditions.push('anio = ?');
        values.push(filters.anio);
      }
      if (filters.sinopsis) {
        conditions.push('sinopsis LIKE ?');
        values.push(`%${filters.sinopsis}%`);
      }
      if (filters.imagen_url) {
        conditions.push('imagen_url = ?');
        values.push(filters.imagen_url);
      }
      if (filters.duracion) {
        conditions.push('duracion = ?');
        values.push(filters.duracion);
      }
      if (filters.pais) {
        conditions.push('pais LIKE ?');
        values.push(`%${filters.pais}%`);
      }
      if (filters.rating_promedio) {
        conditions.push('rating_promedio >= ?');
        values.push(filters.rating_promedio);
      }
      if (filters.trailer_url) {
        conditions.push('trailer_url = ?');
        values.push(filters.trailer_url);
      }
      if (filters.fecha_estreno) {
        conditions.push('fecha_estreno = ?');
        values.push(filters.fecha_estreno);
      }
      if (filters.fecha_creacion) {
        conditions.push('fecha_creacion = ?');
        values.push(filters.fecha_creacion);
      }
      if (filters.fecha_modificacion) {
        conditions.push('fecha_modificacion = ?');
        values.push(filters.fecha_modificacion);
      }
      if (filters.usuario_id) {
        conditions.push('usuario_id = ?');
        values.push(filters.usuario_id);
      }
  
      // Agregar condiciones a la consulta
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
        // Orden y paginación (opcional)
        query += ' ORDER BY fecha_creacion DESC';

        // Ejecutar la consulta
        const [rows] = await db.execute(query, values);
    
        return rows;

      } catch (error) {
        console.error('Error en findMovieByFiltersModel:', error.message);
        throw new Error('Error al filtrar películas');
      }
    };

    module.exports = {
        createMovieModel,
        findAllMovieModel,
        findMovieByFiltersModel ,
        updateMovieModel,
        deleteMovieModel
      };
      
