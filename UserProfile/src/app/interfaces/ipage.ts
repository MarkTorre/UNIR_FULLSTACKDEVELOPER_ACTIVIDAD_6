import { IUser } from "./iuser";

export interface IPage {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Array<IUser>
}

