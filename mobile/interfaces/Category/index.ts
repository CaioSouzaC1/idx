import { IPaginate, IPaginateRoot, ITimestamps } from "../Api";

export interface ICategory extends ITimestamps {
  name: string;
  description: string;
  thumb_path: string;
  full_path: string;
}

export interface IGetCategories extends IPaginateRoot {
  data: IPaginate & {
    data: ICategory[];
  };
}
