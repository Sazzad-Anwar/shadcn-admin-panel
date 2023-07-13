export const Routes = {
  home: {
    id: "home",
    name: "Home",
    link: "/",
  },
  login: {
    id: "login",
    name: "Login",
    link: "/login",
  },
  post: {
    id: "posts",
    name: "Posts",
    link: "/posts",
  },
}

export enum APIRoutes {
  LOGIN = "/api/auth/local",
  POST = "/api/posts",
  USERS = "/api/users",
}
