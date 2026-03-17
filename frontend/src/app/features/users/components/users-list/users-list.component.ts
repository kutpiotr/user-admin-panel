import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from '../../models/user.model';

@Component({
selector: 'app-users-list',
standalone: true,
imports: [CommonModule],
templateUrl: './users-list.component.html',
styleUrl: './users-list.component.css'
})
export class UsersListComponent {
@Input() users: User[] = [];
}