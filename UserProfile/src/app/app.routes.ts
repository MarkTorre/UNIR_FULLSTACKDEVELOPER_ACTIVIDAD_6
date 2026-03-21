import { Routes } from '@angular/router';
import { Formulary } from './pages/formulary/formulary';
import { Profile } from './pages/profile/profile';
import { C404 } from './pages/c404/c404';
import { Home } from './pages/home/home';


export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"/home"},
  {path: "home", component: Home},
  {path: "user/:id", component: Profile},
  {path: "newuser", component: Formulary},
  {path: "updateuser/:id", component: Formulary},
  {path: "**", component: C404 }

];
