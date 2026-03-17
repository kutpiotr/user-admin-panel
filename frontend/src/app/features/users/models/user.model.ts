import { Role } from './role.model';

export interface User {
id: number;
first_name: string;
last_name: string;
email: string;
status: string;
role_id: number;
created_at: string;
role: Role;
}