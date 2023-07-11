import { Router } from 'express';
import Controller from '../controllers/user.controller';

//Importa o controller 

const router = Router();

//get all
router.get("/", Controller.getAll.bind);

// get id
router.get("/:id", Controller.getById.bind);

//post
router.post("/", Controller.create.bind);

//update 
router.put("/:id", Controller.update.bind);

//delete 
router.delete("/:id", Controller.destroy.bind);

export default router;
