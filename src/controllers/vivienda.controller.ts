import {Request, Response  } from "express"
import { connect } from "../database"
import { Vivienda } from "../interface/vivienda.interface"

export async function getViviendas(req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const viviendas = await conn.query('SELECT * FROM Vivienda')
    return res.json(viviendas[0])
}

export async function createVivienda(req: Request, res: Response) {
    const newPost: Vivienda = req.body
    const conn = await connect()
    conn.query('INSERT INTO Vivienda SET?',[newPost])
    return res.json({
        message:'VIVIENDA CREATED'
    })
}

export async function getVivienda(req: Request, res:Response): Promise<Response>{
    const id = req.params.idVivienda
    const conn = await connect()
    const Vivienda = await conn.query('SELECT * FROM Vivienda WHERE idVivienda = ?', [id])
    return res.json(Vivienda[0])
}

export async function deleteVivienda(req: Request, res:Response) {
    const id = req.params.idVivienda;
    const conn = await connect();

    try {
        // Primero eliminar registros en tablas Habita y Posee que están relacionados con esta Vivienda
        await conn.query('DELETE FROM Habita WHERE idVivienda = ?', [id]);
        await conn.query('DELETE FROM Posee WHERE idVivienda = ?', [id]);

        // Ahora puedes eliminar de la tabla Vivienda
        await conn.query('DELETE FROM Vivienda WHERE idVivienda = ?', [id]);

        return res.json({
            message:'VIVIENDA DELETED'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Deleting Vivienda',
            error
        });
    }
}



export async function updateVivienda (req: Request, res:Response){
    const id = req.params.idVivienda
    const updateVivienda: Vivienda = req.body;
    const conn = await connect()
    await conn.query('UPDATE Vivienda set ? WHERE idVivienda = ?', [updateVivienda, id])
    return res.json({
        message:'VIVIENDA UPDATED'
    })
}