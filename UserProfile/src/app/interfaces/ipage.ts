import { IUser, IUSER_INIT} from "./iuser";

export interface IPage {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    results: Array<any>
}

export const IPAGE_INIT: IPage = {
  page: 1,
  per_page: 10,
  total: 15,
  total_pages: 2,
  results: Array.from({ length: 10 }, (_, index) => ({...IUSER_INIT, id: index })) // Para hacer una copia de un objeto {...Object}
}


