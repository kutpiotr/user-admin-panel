import { Routes } from '@angular/router';
import { UsersPageComponent } from './features/users/pages/users-page/users-page.component';
import { UserCreateComponent } from './features/users/pages/user-create/user-create.component';
import { UserEditComponent } from './features/users/pages/user-edit/user-edit.component';

export const routes: Routes = [
{
path: '',
redirectTo: 'users',
pathMatch: 'full'
},
{
path: 'users/create',
component: UserCreateComponent
},
{
path: 'users/:id/edit',
component: UserEditComponent
},
{
path: 'users',
component: UsersPageComponent
}
];