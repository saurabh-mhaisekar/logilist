import type ItemInterface from "$lib/interfaces/ItemInterface";
import Database from "@tauri-apps/plugin-sql";

const loadDatabase = async () => {
  const db = await Database.load("sqlite:logilist.db");
  return db;
};


const insertItem = async (item: ItemInterface) => {
  const db = await loadDatabase();
  await db.execute(`INSERT INTO tbl_items (item_id, description, status, parent_id, level) VALUES (?, ?, ?, ?, ?)`, [
    item.id,
    item.description,
    item.status,
    item.parentId || null,
    item.level
  ]);
};

const getItems = async (): Promise<ItemInterface[]> => {
  const db = await loadDatabase();
  const items = await db.select("SELECT * FROM tbl_items ORDER BY level, item_id") as any[];

  const itemsArray: ItemInterface[] = [];
  items.forEach((item: any) => {
    itemsArray.push({
      id: item.item_id,
      description: item.description,
      status: item.status,
      parentId: item.parent_id,
      level: item.level || 0
    });
  });
  return itemsArray;
};

 const updateItem = async (item: ItemInterface) => {
  const db = await loadDatabase();
  await db.execute(`UPDATE tbl_items SET description = ?, status = ?, parent_id = ?, level = ? WHERE item_id = ?`, [
    item.description,
    item.status,
    item.parentId || null,
    item.level,
    item.id
  ]);
};

const deleteItem = async (item: ItemInterface) => {
  const db = await loadDatabase();
  await db.execute(`DELETE FROM tbl_items WHERE item_id = ?`, [item.id]);
};

 export { deleteItem, getItems, insertItem, updateItem };

