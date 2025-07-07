export interface Subject {
  name: string;
  _id: string;
}
export interface Book {
  name: string;
  _id: string;
  subject: string;
}
export interface Topic {
  name: string;
  _id: string;
  subject: string;
  book: string;
}
