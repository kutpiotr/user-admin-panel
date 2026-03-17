import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Role } from '../../models/role.model';
import { UsersService } from '../../services/users.service';

@Component({
selector: 'app-user-create',
standalone: true,
imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './user-create.component.html',
styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {
private usersService = inject(UsersService);
private router = inject(Router);

roles: Role[] = [];
isLoading = false;
errorMessage = '';

form = {
first_name: '',
last_name: '',
email: '',
status: 'active',
role_id: 1
};

ngOnInit(): void {
this.loadRoles();
}

loadRoles(): void {
this.usersService.getRoles().subscribe({
next: (roles) => {
this.roles = roles;
if (roles.length > 0) {
this.form.role_id = roles[0].id;
}
},
error: () => {
this.errorMessage = 'Nie udało się pobrać listy ról.';
}
});
}

submit(): void {
this.errorMessage = '';

if (!this.form.first_name || !this.form.last_name || !this.form.email) {
this.errorMessage = 'Wypełnij wszystkie wymagane pola.';
return;
}

this.isLoading = true;

this.usersService.createUser(this.form).subscribe({
next: () => {
this.isLoading = false;
this.router.navigate(['/users']);
},
error: (error) => {
this.isLoading = false;

if (error?.error?.detail) {
this.errorMessage = error.error.detail;
return;
}

this.errorMessage = 'Nie udało się utworzyć użytkownika.';
}
});
}
}