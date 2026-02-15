import { Request, Response } from "express";
import { loginKnownUser, saveUser } from "../services/userService";



export const registerUser = (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ ok: false, message: "Missing fields" });
    }

    const response = saveUser(email, username, password);
    return res.json(response);
    
  } catch (err) {
    console.error("Register error: ", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const loginUser = (req: Request, res: Response) => {
    try{ 
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ok: false, message:"Missing fields email -> " + req.body.email + " password -> " + req.body.password})
        }
        const response = loginKnownUser(email, password)
        return res.json(response)

    }catch(err) {
        console.error("Login error: ", err)
        return res.status(500).json({ok: false, message: "Server error"})
    }
}

