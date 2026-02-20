import { Routes } from '@angular/router';
import { Formulary } from './components/formulary/formulary';
import { Profile } from './components/profile/profile';
import { C404 } from './components/c404/c404';
import { Home } from './components/home/home';


export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"/home"},
  {path: "home", component: Home},
  {path: "user/:id", component: Profile},
  {path: "newuser", component: Formulary},
  {path: "updateuser/:id", component: Formulary},
  {path: "**", component: C404 }

];
