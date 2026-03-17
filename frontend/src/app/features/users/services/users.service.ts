import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Role } from '../models/role.model';

export interface PaginatedUsersResponse {
items: User[];
total: number;
page: number;
limit: number;
pages: number;
}

@Injectable({
providedIn: 'root'
})
export class UsersService {
private http = inject(HttpClient);
private apiUrl = 'http://127.0.0.1:8000';

createUser(data: any): Observable<User> {
return this.http.post<User>(`${this.apiUrl}/users`, data);
}

updateUser(id: number, data: any): Observable<User> {
return this.http.put<User>(`${this.apiUrl}/users/${id}`, data);
}

deleteUser(id: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
}

getUsers(
search?: string,
statusFilter?: string,
roleId?: number,
page: number = 1,
limit: number = 5
): Observable<PaginatedUsersResponse> {
let params = new HttpParams()
.set('page', page)
.set('limit', limit);

if (search) {
params = params.set('search', search);
}

if (statusFilter) {
params = params.set('status_filter', statusFilter);
}

if (roleId) {
params = params.set('role_id', roleId);
}

return this.http.get<PaginatedUsersResponse>(`${this.apiUrl}/users`, { params });
}

getUserById(id: number): Observable<User> {
return this.http.get<User>(`${this.apiUrl}/users/${id}`);
}

getRoles(): Observable<Role[]> {
return this.http.get<Role[]>(`${this.apiUrl}/roles`);
}
}