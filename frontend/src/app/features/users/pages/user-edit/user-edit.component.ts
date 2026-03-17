import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Role } from '../../models/role.model';
import { UsersService } from '../../services/users.service';

@Component({
selector: 'app-user-edit',
standalone: true,
imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './user-edit.component.html',
styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
private usersService = inject(UsersService);
private route = inject(ActivatedRoute);
private router = inject(Router);

roles: Role[] = [];
userId!: number;
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
this.userId = Number(this.route.snapshot.paramMap.get('id'));
this.loadRoles();
this.loadUser();
}

loadRoles(): void {
this.usersService.getRoles().subscribe({
next: (roles) => {
this.roles = roles;
},
error: () => {
this.errorMessage = 'Nie udało się pobrać listy ról.';
}
});
}

loadUser(): void {
this.isLoading = true;
this.errorMessage = '';

this.usersService.getUserById(this.userId).subscribe({
next: (user) => {
this.form = {
first_name: user.first_name,
last_name: user.last_name,
email: user.email,
status: user.status,
role_id: user.role_id
};
this.isLoading = false;
},
error: () => {
this.errorMessage = 'Nie udało się pobrać danych użytkownika.';
this.isLoading = false;
}
});
}

submit(): void {
this.errorMessage = '';
this.isLoading = true;

this.usersService.updateUser(this.userId, this.form).subscribe({
next: () => {
this.isLoading = false;
this.router.navigate(['/users']);
},
error: (error) => {
this.isLoading = false;
this.errorMessage = error?.error?.detail || 'Nie udało się zapisać zmian.';
}
});
}
}