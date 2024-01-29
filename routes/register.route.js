import { Router } from "express";
import { createController, deleteController, getAllController, updateController } from "../controllers/register.controller.js";

const router=Router();

router.route('/create').post(createController);
router.route('/getall').get(getAllController);
router.route('/update/:id').put(updateController);
router.route('/delete/:id').delete(deleteController);

export default router;