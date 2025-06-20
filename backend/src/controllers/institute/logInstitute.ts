import { Request, Response } from "express";

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
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}