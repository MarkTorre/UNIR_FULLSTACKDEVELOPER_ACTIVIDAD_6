import { IUser, IUSER_DEFAULT} from "./iuser";

export interface IPage {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    results: Array<any>
}

export const IPAGE_DEFAULT: IPage = {
  page: 1,
  per_page: 10,
  total: 15,
  total_pages: 2,
  results: Array.from({ length: 10 }, (_, index) => ({...IUSER_DEFAULT, id: index })) // Para hacer una copia de un objeto {...Object}
}


