import path from "path";
import saveFile from "../../models/user/user";
import { Request, Response } from "express";
import generateId from "../../../Utils/genId";

const users = require(path.resolve(process.cwd(), "database", "database.json"));

export const getMovies = (req: any, res: any) => {
  try {
    const movies: any[] = [];
    users.forEach((user: any) => {
      user.Movies.forEach((mov: any) => {
        movies.push(mov);
      });
    });
    console.log(movies);
    res.render("movies", { data: movies });
  } catch (error) {
    console.log(error);
  }
};

export const getMovie = (req: Request, res: Response) => {
  try {
    let movie;
    const id = req.params.id;
    users.forEach((user: any) => {
      let gotThis = user.Movies.find((data: any) => data.id == id);

      if (gotThis) {
        movie = gotThis;
      }
    });
    res.json({ code: 200, movie });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createMovie = async (req: any, res: Response) => {
  const movie = req.body;
  const { email } = req.user;
  let genId = new generateId();
  movie.id = genId.gen();

  let personToaddMovie = users.find((user: any) => user.email == email);
  if (personToaddMovie) {
    personToaddMovie.Movies.unshift(movie);
    let newDatabase = users.map((user: any) => {
      if (user.email == email) {
        return personToaddMovie;
      } else {
        return user;
      }
    });
    res
      .status(201)
      .json({ code: 201, message: "movie created successfuly", movie });
    saveFile(newDatabase);
  } else {
    res.status(400).json({ code: 400, message: "could not create movie" });
  }
};

export const updateMovie = async (req: any, res: Response) => {
  try {
    // console.log(req.body);
    const { email } = req.user;
    const Movie = req.body;
    let movieId = req.params.id;

    // console.log(req.params.id, email, data);

    let user = users.filter((file: any) => {
      return file.email === email;
    });

    if (user.length > 0) {
      user[0].Movies.forEach((mov: any) => {
        if (mov.id === movieId) {
          Movie.title ? (mov.title = Movie?.title) : null;
          Movie.price ? (mov.price = Movie?.price) : null;
          Movie.image ? (mov.image = Movie?.image) : null;
          Movie.description ? (mov.description = Movie?.description) : null;
          console.log(mov);
        }
      });

      let newDatabase = users.map((person: any) => {
        if (person.email == email) {
          return user[0];
        } else {
          return person;
        }
      });
      saveFile(newDatabase);
      res.json(newDatabase);
    } else {
      res.json({ code: 400, message: "no such users" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const deleteMovie = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    let newDatabase = users.map((user: any) => {
      const newMovies = user?.Movies?.filter((file: any) => file.id != id);
      user.Movies = newMovies;
      return user;
    });
    saveFile(newDatabase);
    res.status(200).json({ code: 200, message: "movie deleted" });
  } catch (error) {
    res.status(400).json({ code: 400, message: "not deleted" });
  }
};
