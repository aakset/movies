import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from '$app/env/private';

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("ScreenStackDB"); // select database

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Older movies in the DB still store the runtime as "length" -> map it to "duration"
function normalizeMovie(movie) {
  movie._id = movie._id.toString(); // convert ObjectId to String
  if (movie.duration === undefined && movie.length !== undefined) {
    movie.duration = movie.length;
  }
  delete movie.length;
  return movie;
}

// Get all movies
async function getMovies() {
  let movies = [];
  try {
    const collection = db.collection("movies");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    movies = await collection.find(query).toArray();
    movies.forEach(normalizeMovie);
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return movies;
}

// Get movie by id
async function getMovie(id) {
  let movie = null;
  try {
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) }; // filter by id
    movie = await collection.findOne(query);

    if (!movie) {
      console.log("No movie with id " + id);
      // TODO: errorhandling
    } else {
      normalizeMovie(movie);
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return movie;
}

// create movie
// Example movie object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  duration: "120 Minuten"
} 
*/
async function createMovie(movie) {
  movie.poster = "/images/placeholder.jpg"; // default poster
  movie.actors = [];
  movie.watchlist = false;
  try {
    const collection = db.collection("movies");
    const result = await collection.insertOne(movie);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update movie
// Example movie object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  title: "Das Geheimnis von Altura",
  year: 2024,
  duration: "120 Minuten",
  actors: [
    "Lena Herzog",
    "Maximilian Schröder",
    "Sophia Neumann"
  ],
  poster: "/images/Altura.png",
  watchlist: false
} 
*/
// returns: id of the updated movie or null, if movie could not be updated
async function updateMovie(movie) {
  try {
    let id = movie._id;
    delete movie._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: movie });

    if (result.matchedCount === 0) {
      console.log("No movie with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Movie with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete movie by id
// returns: id of the deleted movie or null, if movie could not be deleted
async function deleteMovie(id) {
  try {
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No movie with id " + id);
    } else {
      console.log("Movie with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
