import express, {Router, Request, Response} from "express";
import { getAll, getReserve, createReserve, deleteReserve, updateReserve } from "../controllers/reserveController";

const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) =>{
    getAll(req, res);
});

router.post('/', async (req: Request, res: Response)=>{
    createReserve(req, res);
});

router.put('/:id', async (req: Request, res: Response)=>{
    updateReserve(req, res);
})

router.delete('/:id', async (req: Request, res: Response)=>{
    deleteReserve(req, res);
})

//export const reservationRouter: Router = router;
export {router as reservationRouter};