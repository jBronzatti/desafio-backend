import { Request, Response } from "express";
import { UpdateResult, InsertOneResult, Document, DeleteResult } from "mongodb";
import Reservation from "../model/reserve"
import { deleter, updater, creater, getAllService, getter } from "../services/crudService";

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const { skip, limit } = req.query;
    const { checkInDate, checkOutDate } = req.body;
    var start = (skip === undefined)?0:Number(skip)
    var step = (limit === undefined)?10:Number(limit)
    const allReserves: Reservation[] = await getAllService({ checkInDate, checkOutDate }, start, step) as unknown as Reservation[];
    res.status(200).send(allReserves);
  } catch (err: any) {
    console.error(err);
    res.status(500).send("Erro ao consultar o serviço");
  }
}

export async function getReserve(req: Request, res: Response): Promise<void> {
  try {
    const id = req?.params?.id;
    const reserve: Reservation = await getter(id) as unknown as Reservation;

    if (reserve) {
      res.status(200).send(reserve);
    }
  } catch (err: any) {
    console.log(err)
    res.status(500).send(`Não foi possível encontrar uma reserva com o id: ${req.params.id}`)
  }
}

export async function createReserve(req: Request, res: Response): Promise<void> {
  try {
    const newReserve = req.body as Reservation;
    const result: InsertOneResult<Document> | undefined = await creater(newReserve);

    result
      ? res.status(201).send("Reserva(s) criada(s) com sucesso")
      : res.status(400).send("Falha ao criar reserva");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message)
  }
}

export async function updateReserve(req: Request, res: Response): Promise<void> {
  try {
    const id = req?.params?.id;
    const updatedReserve: Reservation = req.body as Reservation;
    const result: UpdateResult | undefined = await updater(id, updatedReserve);
    result
      ? res.status(200).send(`Reserva com id ${id} atualizada com sucesso!`)
      : res.status(304).send(`Reserva com id ${id} não foi atualizada`);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
}

export async function deleteReserve(req: Request, res: Response): Promise<void> {
  try {
    const id: string = req?.params?.id;
    const result: DeleteResult | undefined = await deleter(id);
    result
      ? res.status(202).send("Sucesso em remover a reserva")
      : res.status(404).send("Rerva não encontrada");
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
}