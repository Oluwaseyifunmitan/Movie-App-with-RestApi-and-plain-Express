import path from "path";
import saveFile from "../../models/user/user";
import { Request, Response } from "express";
import generateId from "../../../Utils/genId";
import user from "../../routes/user_route/user_route";
import movie from "../../routes/movie_route/movie_route";

const users = require(path.resolve(process.cwd(), "database", "database.json"));

export const getMovies = (req: Request, res: Response) => {
  try {
    let movies: any[] = [];
    users.map((data: any) => {
      if (data?.Movies?.length > 0) {
        data.Movies.map((file: any) => {
          movies.unshift(file);
        });
      }
    });
    // console.log(movies);
    res.status(200).json(movies);
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

export const createMovie = (req: Request, res: Response) => {
  //post request
  //email, movieObjext
  const { email, Movie } = req.body;
  console.log(email, Movie);

  const userMovieToEdit = users?.filter((userData: any) => {
    return userData.email == email;
  });

  if (userMovieToEdit.length > 0) {
    console.log(true);

    userMovieToEdit[0]?.Movies.unshift(Movie);
    let newDatabase = users.map((userDatas: any) => {
      if (userDatas.email == email) {
        return userMovieToEdit;
      } else {
        return userDatas;
      }
    });

    console.log(users);
    saveFile(newDatabase[0]);

    return res.status(201).json(newDatabase[0]);
  } else {
    console.log("false");
    res.status(404).json({ code: 404, message: "no user found " });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { email, Movie } = req.body;
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
    res.status(200).json({ message: "movie deleted" });
  } catch (error) {
    res.status(400).json({ message: "not deleted" });
  }
};
