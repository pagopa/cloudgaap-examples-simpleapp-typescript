import { Handler, Router } from "express";
import { PGClient } from "../clients/pg";
import { Context } from "../types";

function createGETHandler(context: Context): Handler {
  return function (_req, res) {
    res.render("create", { context });
  };
}

function createPOSTHandler(context: Context, pgClient: PGClient): Handler {
  return async function (req, res) {
    const query = `INSERT INTO Note(title,body) VALUES($1,$2) RETURNING *;`;
    const values = [req.body.title, req.body.body];

    await pgClient.query(query, values);
    res.redirect(`${context.basePath}/`);
  };
}

function makeCreateRouter(context: Context, pgClient: PGClient) {
  const router = Router();

  router.get("/", createGETHandler(context));

  router.post("/", createPOSTHandler(context, pgClient));

  return router;
}

export { makeCreateRouter };
