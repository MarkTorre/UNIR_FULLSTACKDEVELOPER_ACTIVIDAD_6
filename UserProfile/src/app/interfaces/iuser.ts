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

export const IUSER_INIT: IUser = {
  _id: "63740fede2c75d8744f80a4a",
  id: 0,
  first_name: "Juan",
  last_name: "Pablo",
  username: "ArtoriasOfTheAbyss",
  password: "123",
  email: "juan",
  image: "https://i0.wp.com/impactify.io/wp-content/uploads/2024/05/placeholder-5.png?ssl=1"
}
