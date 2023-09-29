import { sql } from "../database/database.js";

const createItem = async (name, listId) => {
  await sql`INSERT INTO
    shopping_list_items (name, shopping_list_id )
    VALUES (${name}, ${listId})`;
};
const findCurrentItem = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${listId} `;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return false;
};
const viewItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items
  WHERE shopping_list_id = ${listId} ORDER BY collected ASC, name;`;
};

const collectItem = async (itemId, listId) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}
  AND shopping_list_id=${listId}`;
};
export { createItem, findCurrentItem, viewItems, collectItem };
