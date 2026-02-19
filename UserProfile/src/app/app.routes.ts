import { Routes } from '@angular/router';
import { Formulary } from './components/formulary/formulary';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"home"},
  {path: "user/:id", component: Profile},
  {path: "newuser", component: Formulary},
  {path: "updateuser/:id", component: Formulary},

];
