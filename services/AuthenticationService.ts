import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME
  ? process.env.DB_USERNAME
  : "sounakbh"; //process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD
  ? process.env.DB_PASSWORD
  : "newpassword"; //process.env.DB_PASSWORD;
const HOST = "cluster0.fv8ys.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;

// connect to the database
mongoose
  .connect(connectionString)
  .then((_) => console.log("Connected!"))
  .catch((e) => console.log("Auth failed"));

export const login = (u: string, p: string) =>
  userDao
    .findUserByCredentials(u, p)
    .then((user) => {
      if (user) {
        return user;
      } else {
        throw "Unknown user";
      }
    })
    .then((user) => user)
    .catch((e) => e);

export const signup = (u: string, p: string, e: string) =>
  userDao
    .findUserByUsername(u)
    .then((user) => {
      if (user) {
        throw "User already exists";
      } else {
        return userDao.createUser({
          username: u,
          password: p,
          email: e,
        });
      }
    })
    .then((newUser) => newUser)
    .catch((e) => e);
