import { Handler, Router } from "express";
import { PGClient } from "../clients/pg";
import { Context } from "../types";

function indexGETHandler(context: Context, pgClient: PGClient): Handler {
  return async function (_req, res) {
    const query = `SELECT * FROM Note ORDER BY id;`;

    const { rows } = await pgClient.query(query).catch((error) => {
      console.log(error);
      return { rows: [] };
    });
    res.render("index", { context, item: rows });
  };
}

function makeIndexRouter(context: Context, pgClient: PGClient) {
  const router = Router();

  router.get("/", indexGETHandler(context, pgClient));

  return router;
}

export { makeIndexRouter };
