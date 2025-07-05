export default interface ItemInterface {
  id: string;
  description: string;
  status: "active" | "completed";
  parentId?: string;
  level: number;
}