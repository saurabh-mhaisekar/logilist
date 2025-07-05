import type ItemInterface from "$lib/interfaces/ItemInterface";
import Database from "@tauri-apps/plugin-sql";

const loadDatabase = async () => {
  const db = await Database.load("sqlite:logilist.db");
  return db;
};


const insertItem = async (item: ItemInterface) => {
  const db = await loadDatabase();
  await db.execute(`INSERT INTO tbl_items (item_id, description, status) VALUES (?, ?, ?)`, [
    item.id,
    item.description,
    item.status
  ]);
};

const getItems = async () => {
  const db = await loadDatabase();
  const items = await db.select("SELECT * FROM tbl_items");
  return items;
};

 const updateItem = async (item: ItemInterface) => {
  const db = await loadDatabase();
  await db.execute(`UPDATE tbl_items SET description = ?, status = ? WHERE item_id = ?`, [
    item.description,
    item.status,
    item.id
  ]);
};
 export { getItems, insertItem, updateItem };

