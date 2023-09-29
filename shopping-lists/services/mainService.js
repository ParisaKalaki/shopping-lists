import { sql } from "../database/database.js";

const lists = async () => {
  return await sql`SELECT * FROM shopping_lists`;
};
const items = async () => {
  return await sql`SELECT * FROM shopping_list_items`;
};

export { lists, items };
