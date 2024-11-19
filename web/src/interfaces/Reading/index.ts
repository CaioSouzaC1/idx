import { IPaginateRoot, IPaginate, ITimestamps, IApiRoot } from "../Api";
import { IBook } from "../Book";

export interface IRead extends ITimestamps {
  book: IBook;
  book_id: string;
  page: number;
  read_count?: number;
  user_id: string;
}

export interface IGetReadings extends IPaginateRoot {
  data: IPaginate & {
    data: IRead[];
  };
}

export interface IShowReading extends IApiRoot {
  data: IRead | null;
}

export interface ICategoryMostRead {
  category_id: string;
  category_name: string;
  read_count: number;
}

export interface IGetCategoryMostRead extends IPaginateRoot {
  data: IPaginate & {
    data: ICategoryMostRead[];
  };
}

export interface IBookMostFinished {
  book_id: string;
  title: string;
  finished_count: number;
}

export interface IGetBookMostFinished extends IPaginateRoot {
  data: IPaginate & {
    data: IBookMostFinished[];
  };
}
