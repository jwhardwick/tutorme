import { PayComponent } from './components/pay/pay.component';
import { ViewComponent } from './components/view/view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'view/:tutorId',
        component: ViewComponent
    },
    {
        path: 'pay/:date/:code',
        component: PayComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
    ]
  })
export class AppRoutingModule { }
