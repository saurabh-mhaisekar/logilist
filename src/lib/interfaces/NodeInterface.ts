export default interface NodeInterface {
  id: string;
  title: string;
  status: "deleted" | "active" | "completed";
}
