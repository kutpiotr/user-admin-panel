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

currentPage = 1;
pageSize = 5;
totalItems = 0;
totalPages = 1;

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
roleId,
this.currentPage,
this.pageSize
).subscribe({
next: (response) => {
this.users = response.items;
this.totalItems = response.total;
this.totalPages = response.pages;
this.currentPage = response.page;
this.isLoading = false;
},
error: () => {
this.errorMessage = 'Nie udało się pobrać użytkowników.';
this.isLoading = false;
}
});
}

applyFilters(): void {
this.currentPage = 1;
this.loadUsers();
}

resetFilters(): void {
this.filters = {
search: '',
status: '',
role_id: ''
};
this.currentPage = 1;
this.loadUsers();
}

goToPreviousPage(): void {
if (this.currentPage > 1) {
this.currentPage--;
this.loadUsers();
}
}

goToNextPage(): void {
if (this.currentPage < this.totalPages) {
this.currentPage++;
this.loadUsers();
}
}

deleteUser(userId: number): void {
const confirmed = window.confirm('Czy na pewno chcesz usunąć tego użytkownika?');

if (!confirmed) {
return;
}

this.usersService.deleteUser(userId).subscribe({
next: () => {
if (this.users.length === 1 && this.currentPage > 1) {
this.currentPage--;
}
this.loadUsers();
},
error: () => {
this.errorMessage = 'Nie udało się usunąć użytkownika.';
}
});
}
}