import { Handler, Router } from "express";
import { PGClient } from "../clients/pg";
import { Context } from "../types";

function deleteGETHandler(context: Context, pgClient: PGClient): Handler {
  return async function (req, res) {
    const query = `DELETE FROM Note WHERE id=$1 RETURNING *;`;
    const values = [req.params.id];

    await pgClient.query(query, values);
    res.redirect(`${context.basePath}/`);
  };
}

function makeDeleteRouter(context: Context, pgClient: PGClient) {
  const router = Router();

  router.get("/:id", deleteGETHandler(context, pgClient));

  return router;
}

export { makeDeleteRouter };
