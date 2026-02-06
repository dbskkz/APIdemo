import { Routes } from '@angular/router';
import { ApiDemoComponent } from './@Component/api-demo/api-demo.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {path:'api',component:ApiDemoComponent},
  {path:'**', component:AppComponent}
];
