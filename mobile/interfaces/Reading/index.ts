import { IPaginateRoot, IPaginate, ITimestamps } from "../Api";
import { IBook } from "../Book";

export interface IRead extends ITimestamps {
  book: IBook;
  book_id: string;
  page: number;
  user_id: string;
}

export interface IGetReadings extends IPaginateRoot {
  data: IPaginate & {
    data: IRead[];
  };
}
