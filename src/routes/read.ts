import { Handler, Router } from "express";
import { PGClient } from "../clients/pg";
import { Context } from "../types";

function readGETHandler(context: Context, pgClient: PGClient): Handler {
  return async function (req, res) {
    const query = `SELECT * FROM Note WHERE id=$1;`;
    const values = [req.params.id];

    const { rows } = await pgClient.query(query, values);
    res.render("read", { context, data: rows[0] });
  };
}

function makeReadRouter(context: Context, pgClient: PGClient) {
  const router = Router();

  router.get("/:id", readGETHandler(context, pgClient));

  return router;
}

export { makeReadRouter };
