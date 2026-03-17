import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({
providedIn: 'root'
})
export class UsersService {
private http = inject(HttpClient);
private apiUrl = 'http://127.0.0.1:8000';

createUser(data: any) {
return this.http.post(`${this.apiUrl}/users`, data);
}

updateUser(id: number, data: any) {
return this.http.put(`${this.apiUrl}/users/${id}`, data);
}

getUsers(search?: string, statusFilter?: string, roleId?: number): Observable<User[]> {
let params = new HttpParams();

if (search) {
params = params.set('search', search);
}

if (statusFilter) {
params = params.set('status_filter', statusFilter);
}

if (roleId) {
params = params.set('role_id', roleId);
}

return this.http.get<User[]>(`${this.apiUrl}/users`, { params });
}

getUserById(id: number): Observable<User> {
return this.http.get<User>(`${this.apiUrl}/users/${id}`);
}

getRoles(): Observable<Role[]> {
return this.http.get<Role[]>(`${this.apiUrl}/roles`);
}
}