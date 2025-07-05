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

const getItems = async (): Promise<ItemInterface[]> => {
  const db = await loadDatabase();
  const items = await db.select("SELECT * FROM tbl_items") as any[];

  const itemsArray: ItemInterface[] = [];
  items.forEach((item: any) => {
    itemsArray.push({
      id: item.item_id,
      description: item.description,
      status: item.status
    });
  });
  return itemsArray;
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

