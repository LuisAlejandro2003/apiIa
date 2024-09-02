import { Request, Response } from 'express';
import { exec } from 'child_process';

export const postUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const prompt = req.body.prompt; // Asume que el prompt viene en el body de la solicitud
        if (!prompt) {
            res.status(400).json({ error: "No se proporcionó ningún prompt" });
            return;
        }

        exec(`ollama run llama3.1`, (error, stdout, stderr) => {
            if (error) {
                res.status(500).json({ error: `Error ejecutando el modelo: ${stderr}` });
                return;
            }
            
            // Envía la respuesta generada por el modelo
            res.status(200).json({ response: stdout });
        });

    } catch (error) {
        res.status(400).send(error);
    }
}
