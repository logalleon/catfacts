import { Router } from "express";
import Knifefight from "./Controllers/Catfacts";
import config from "./config";

const init = (): Router => {

  const router: Router = Router();
  router.get('/status', (req, res) => res.sendStatus(200));
  const knifefight = new Knifefight();
  router.post(config.NAMESPACE, knifefight.handle.bind(knifefight));
  return router;

}

export default init;