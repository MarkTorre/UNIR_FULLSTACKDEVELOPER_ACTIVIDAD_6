export interface IUser {
  _id: string,
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  email: string,
  image: string
}

export const IUSER_DEFAULT: IUser = {
  _id: "null",
  id: 0,
  first_name: "First name not found",
  last_name: "Last name not found",
  username: "Username Not Found",
  password: "123",
  email: "juan",
  image: "https://i0.wp.com/impactify.io/wp-content/uploads/2024/05/placeholder-5.png?ssl=1"
}
