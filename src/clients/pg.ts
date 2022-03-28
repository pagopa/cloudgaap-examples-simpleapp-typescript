import { Pool } from "pg";

function makePGClient(connectionString: string) {
  const pool = new Pool({
    connectionString,
  });

  return {
    query: async (text: string, params?: any) => pool.query(text, params),

    init: async () => {
      const init = `CREATE TABLE IF NOT EXISTS note (title varchar(40) NOT NULL,body varchar(40) NOT NULL,id SERIAL PRIMARY KEY);`;
      await pool.query(init);
    },
  };
}

type PGClient = ReturnType<typeof makePGClient>;

export { PGClient, makePGClient };
