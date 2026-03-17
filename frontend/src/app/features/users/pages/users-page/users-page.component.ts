import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { UsersListComponent } from '../../components/users-list/users-list.component';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { UsersService } from '../../services/users.service';

@Component({
selector: 'app-users-page',
standalone: true,
imports: [CommonModule, FormsModule, RouterLink, UsersListComponent],
templateUrl: './users-page.component.html',
styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {
private usersService = inject(UsersService);

users: User[] = [];
roles: Role[] = [];
isLoading = false;
errorMessage = '';

filters = {
search: '',
status: '',
role_id: ''
};

ngOnInit(): void {
this.loadRoles();
this.loadUsers();
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

loadUsers(): void {
this.isLoading = true;
this.errorMessage = '';

const roleId =
this.filters.role_id !== '' ? Number(this.filters.role_id) : undefined;

this.usersService.getUsers(
this.filters.search || undefined,
this.filters.status || undefined,
roleId
).subscribe({
next: (data) => {
this.users = data;
this.isLoading = false;
},
error: () => {
this.errorMessage = 'Nie udało się pobrać użytkowników.';
this.isLoading = false;
}
});
}

applyFilters(): void {
this.loadUsers();
}

resetFilters(): void {
this.filters = {
search: '',
status: '',
role_id: ''
};

this.loadUsers();
}

deleteUser(userId: number): void {
const confirmed = window.confirm('Czy na pewno chcesz usunąć tego użytkownika?');

if (!confirmed) {
return;
}

this.usersService.deleteUser(userId).subscribe({
next: () => {
this.users = this.users.filter((user) => user.id !== userId);
},
error: () => {
this.errorMessage = 'Nie udało się usunąć użytkownika.';
}
});
}
}