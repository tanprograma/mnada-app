export interface ExamQuestion {
  answer: string;
  selected: string;
}
export interface Exam {
  _id: string;
  topic: string;
  subject: string;
  source: string;
  questions: ExamQuestion[];
}
export interface ExamResult extends Exam {
  testID: string;

  createdAt: string;
  updatedAt: string;
}
export interface MarkPayload {
  item: ExamQuestion;
  answer: string;
}
