import { Router } from "express";
import { postUser} from '../controllers/userController';

const router: Router = Router();


router.post('/', postUser);


export default router;