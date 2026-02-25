import fs from "fs";
import path from "path";
import { hashPassword } from "../utils/hash";
import { LoginResponse, ServerResponse, User } from "../models/models";
import crypto from "crypto";

const USERS_FILE = path.join(__dirname, "../db/users.txt");

/** Return all users from DB as objects */
export function getAllUsers(): User [] {
  if (!fs.existsSync(USERS_FILE)) return [];

  const lines = fs.readFileSync(USERS_FILE, "utf8").trim().split("\n");

  return lines
    .filter(line => line.trim().length > 0)
    .map(line => {
      const [uid, email, username, password] = line.split("|");
      return { uid, email, username, password };
    });
}

/** Check if an email already exists in DB */
export function emailExists(email: string): boolean {
  const users = getAllUsers();
  return users.some(u => u.email === email);
}

/** Check if that username is already in use */
export function usernameExists(username: string): boolean {
    const users = getAllUsers();
    return users.some(u => u.username.toLowerCase() === username.toLowerCase())
}



/** Save user ONLY IF email not used and username not used*/
export function saveUser(email: string, username: string, password: string): ServerResponse | LoginResponse{
  if (emailExists(email)) {
    return { ok: false, message: "Un cont cu acest email există deja. Ți-ai uitat parola?" };
  }

  if(usernameExists(username)) {
    return {ok: false, message: "Acest nume de utilizator este deja folosit. Încearcă altul!"}
  }
  const id = crypto.randomUUID();
  const hashed = hashPassword(password);
  const line = `${id}|${email}|${username}|${hashed}\n`;
  const userCount = getAllUsers().length;

  fs.appendFileSync(USERS_FILE, line, { encoding: "utf8" });
  const userCountAfterRegister = getAllUsers().length;
  

  const newUser: User = {
    //id trebuie adaugat aici e register deci trebuie sa creem noi un id. vreau sa fie din alea lungi, nu 1 2 3 4 5
    uid: id,
    email: email,
    username: username,
    password: hashed
  }

  if(userCountAfterRegister == userCount + 1){
    return { ok: true, message: "Cont creat cu succes.", user: newUser };
  }
  return {ok: false, message: "Ceva nu a mers bine. Te rog incearca din nou!!"}
}

export function getUser(email:string): User | null{
    const allUsers = getAllUsers();
    const user = allUsers.find(u => u.email === email)
    if(user) {return user}
    return null
}

export function loginKnownUser(email: string, password: string): ServerResponse | LoginResponse{ 
    if(!emailExists(email)){
        return {ok: false, message: "Se pare ca nu ai un cont. Vrei sa creezi unul?"}
    }
    const user = getUser(email)
    if(user){
        const hashedInput = hashPassword(password)
        if(hashedInput === user.password){
            return {ok: true, message:"Logare cu succes.", user: user}}
        return {ok: false, message: "Parola e gresita. Incearca din nou!"}

    }
    return {ok: true, message:"Ceva nu a mers bine. Te rog incearca din nou!!" }
}