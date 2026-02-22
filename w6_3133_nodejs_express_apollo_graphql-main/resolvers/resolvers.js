import MovieModel from '../models/movie.js';

const movieResolvers = {
  Query: {
    hello: () => "GraphQL Server Running",

    // Get all movies
    getAllMovies: async () => {
      try {
        return await MovieModel.find();
      } catch (error) {
        throw new Error("Unable to fetch movies: " + error.message);
      }
    },

    // Get movie by ID
    getMovieById: async (_, { id }) => {
      try {
        return await MovieModel.findById(id);
      } catch (error) {
        throw new Error("Unable to fetch movie by ID: " + error.message);
      }
    },

    // Get movies by director
    getMoviesByDirector: async (_, { director_name }) => {
      try {
        return await MovieModel.find({ director_name });
      } catch (error) {
        throw new Error("Unable to fetch movies by director: " + error.message);
      }
    },
  },

  Mutation: {
    // Insert a new movie
    insertMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = new MovieModel({ name, director_name, production_house, release_date, rating });
        return await newMovie.save();
      } catch (error) {
        throw new Error("Unable to insert movie: " + error.message);
      }
    },

    // Update an existing movie
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(
          id,
          { name, director_name, production_house, release_date, rating },
          { new: true } // Return the updated document
        );
        return updatedMovie;
      } catch (error) {
        throw new Error("Unable to update movie: " + error.message);
      }
    },

    deleteMovie: async (_, { id }) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(id);
    return deletedMovie;
  } catch (error) {
    throw new Error("Unable to delete movie: " + error.message);
  }
}
  },
};

export default movieResolvers;