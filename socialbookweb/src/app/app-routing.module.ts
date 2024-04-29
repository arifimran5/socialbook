import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:username',
    component: UserpageComponent,
    canActivate: [AuthGuard, ProfileGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
