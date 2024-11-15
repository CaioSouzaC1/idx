import { IApiRoot, IPaginate, ITimestamps } from "../Api";
import { ICategory } from "../Category";

export interface IBook extends ITimestamps {
  title: string;
  synopsis: string;
  pdf_path: string;
  thumb_path: string;
  redirect_url: string;
  category_id: string;
  category: ICategory;
  full_path: string;
  pdf_full_path: string;
  page_count: number;
}

export interface IGetBooks extends IApiRoot {
  data: IPaginate & {
    data: IBook[];
  };
}
