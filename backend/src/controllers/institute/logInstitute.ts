import  Institute  from "@/models/institute/insitituteModel"
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "@/utils/institute/hashAuth";
import {instituteLoginSchema} from "@/validations/instituteValidation";


const logInInstitute = async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body;
        const parsed = instituteLoginSchema.safeParse(body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }
        const { contactEmail, password } = parsed.data;
        const foundEmail = await Institute.findOne({contactEmail})

        if(!foundEmail) {res.status(400).json({error: "Email not found"}); return;}


        const isPasswordValid = await comparePassword(password, foundEmail.password);
        if (!isPasswordValid) {
                res.status(400).json({ error: "Invalid password" });
                return;
            }
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}