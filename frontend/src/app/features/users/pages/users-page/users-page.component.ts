import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UsersListComponent } from '../../components/users-list/users-list.component';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
selector: 'app-users-page',
standalone: true,
imports: [CommonModule, RouterLink, UsersListComponent],
templateUrl: './users-page.component.html',
styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {
private usersService = inject(UsersService);

users: User[] = [];
isLoading = false;
errorMessage = '';

ngOnInit(): void {
this.loadUsers();
}

loadUsers(): void {
this.isLoading = true;
this.errorMessage = '';

this.usersService.getUsers().subscribe({
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
}