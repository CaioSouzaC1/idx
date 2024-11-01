import { IApiRoot, IPaginate, ITimestamps } from "../Api";

export interface ICategory extends ITimestamps {
  name: string;
  description: string;
  thumb_path: string;
  full_path: string;
}

export interface IGetCategories extends IApiRoot {
  data: IPaginate & {
    data: ICategory[];
  };
}
