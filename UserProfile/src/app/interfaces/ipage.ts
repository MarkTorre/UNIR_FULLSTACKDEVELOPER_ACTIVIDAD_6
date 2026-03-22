import { IUser, IUSER_DEFAULT} from "./iuser";

export interface IPage {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    results: Array<any>
}
