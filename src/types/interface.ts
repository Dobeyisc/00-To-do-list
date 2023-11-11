
export type ItemId = `${string}-${string}-${string}-${string}-${string}`;
 interface structureItem {
    id: ItemId;
    timestamp: number;
    text: string;
  }
export default structureItem;