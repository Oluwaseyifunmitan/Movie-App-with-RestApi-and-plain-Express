import path from "path";
import saveFile from "../../models/user/user";
import { Request, Response } from "express";

const users = require(path.resolve(process.cwd(), "database", "database.json"));

export const getMovies = (req: Request, res: Response) => {
  try {
    let movies: any[] = [];
    users.map((data: any) => {
      if (data?.Movies.length > 0) {
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

export const createMovie = (req: Request, res: Response) => {
  //post requuset
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

// export const updateMovie = (req: Request, res: Response) => {
//   const { email, data, id } = req.body;

//   console.log(req.params.id, email, data);
//   let movies = req.body;
//   const updateMovie = users.filter((file: any) => {
//     return file.email === email;
//   });

//   console.log(updateMovie);
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { email, title, description, image, price } = await req.body;
    const id = req.params.id;
    const userMovieToEdit = users?.filter((userData: any) => {
      return userData.email === email;
    });
    const findMovieById = userMovieToEdit.Movies.find(
      (movie: any) => movie.id === id
    );
    if (!findMovieById) {
      res.status(400).json({ message: "Movie not found" });
    }
    const bodyData = {
      title: title | findMovieById.title,
      description: description | findMovieById.description,
      image: image | findMovieById.image,
      price: price | findMovieById.price,
    };
    const index = userMovieToEdit.Movies.findIndex(
      (eachmovie: any) => eachmovie.id === id
    );
    userMovieToEdit.Movies[index] = { findMovieById, ...bodyData };
    saveFile(userMovieToEdit.Movies[index]);
    return res.status(200).json(userMovieToEdit.Movies[index]);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteMovie = (req: Request, res: Response) => {
  // const movieIndex = movies.find((val) => val.id === Number(req.params.id));
  // movies.slice(movieIndex, 1);
  // res.status(200).json({ message: "Deleted" });
};
