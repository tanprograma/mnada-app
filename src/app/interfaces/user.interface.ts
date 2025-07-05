export interface User {
  firstname: string;
  lastname: string;
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'other';
}
