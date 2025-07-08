import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';

import { Book, Subject, Topic } from '../interfaces/study-tools.interface';
import { StudyToolsService } from '../services/study-tools.service';
import { Exam, ExamQuestion } from '../interfaces/exam.interface';
// making utilities immutable
type State = {
  books: Book[];
  subjects: Subject[];
  topics: Topic[];
  exams: Exam[];
  examCart: ExamQuestion[];
  selectedExam: Exam | null;
  filter: { subject: string; book: string; topic: string };
};
const initialState: State = {
  books: [],
  topics: [],
  subjects: [],
  exams: [],
  examCart: [],
  filter: {
    subject: '',
    topic: '',
    book: '',
  },
  selectedExam: null,
};
export const StudyToolsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ books, subjects, topics, exams, selectedExam, filter }) => ({
    displayedBooks: computed(() => {
      if (subjects().length == 0) return [];
      return books()
        .map((item) => {
          const subject = subjects().find(
            (s) => s._id == item.subject
          ) as Subject;
          return { ...item, subject: subject.name };
        })
        .filter((item) => {
          if (filter().subject == '') return true;
          return item.subject.includes(filter().subject);
        });
    }),
    displayedTopics: computed(() => {
      if (books().length == 0) return [];
      if (subjects().length == 0) return [];
      return topics()
        .map((item) => {
          const subject = subjects().find(
            (s) => s._id == item.subject
          ) as Subject;
          const book = books().find((s) => s._id == item.book) as Book;
          return { ...item, subject: subject.name, book: book.name };
        })
        .filter((item) => {
          if (filter().subject == '') return true;
          return item.subject.includes(filter().subject);
        });
    }),
    displayedExams: computed(() => {
      if (books().length == 0) return [];
      if (subjects().length == 0) return [];
      if (topics().length == 0) return [];
      return exams().map((item) => {
        const subject = subjects().find(
          (s) => s._id == item.subject
        ) as Subject;
        const book = books().find((s) => s._id == item.source) as Book;
        const topic = topics().find((s) => s._id == item.topic) as Topic;
        return {
          ...item,
          subject: subject.name,
          source: book.name,
          topic: topic.name,
        };
      });
    }),
    displayedExamInfo: computed(() => {
      // if (books().length == 0)
      //   return { source: '', topic: '', subject: '', marks: 0 };
      // if (subjects().length == 0)
      //   return { source: '', topic: '', subject: '', marks: 0 };
      // if (topics().length == 0)
      //   return { source: '', topic: '', subject: '', marks: 0 };
      if (!!selectedExam()) {
        // const subject = subjects().find(
        //   (s) => s._id == selectedExam()?.subject
        // ) as Subject;
        // const book = books().find(
        //   (s) => s._id == selectedExam()?.source
        // ) as Book;
        // const topic = topics().find(
        //   (s) => s._id == selectedExam()?.topic
        // ) as Topic;
        const marks = selectedExam()?.questions.reduce(
          (cum, curr: ExamQuestion) => {
            if (curr.answer == curr.selected) {
              cum += 1;
            }
            return cum;
          },
          0
        );
        return {
          marks: Math.floor(
            ((marks as number) /
              (selectedExam()?.questions?.length as number)) *
              100
          ),
        };
      } else {
        return { marks: 0 };
      }
    }),
  })),
  withMethods((store, studyToolsService = inject(StudyToolsService)) => ({
    //   books methods
    updateFilter(
      payload: Partial<{ subject: string; book: string; topic: string }>
    ) {
      patchState(store, (state) => ({
        ...state,
        filter: { ...state.filter, ...payload },
      }));
    },
    resetFilter() {
      patchState(store, (state) => ({
        ...state,
        filter: { book: '', topic: '', subject: '' },
      }));
    },
    async getBooks(query: { [key: string]: any } = {}) {
      const result = await studyToolsService.getBooks(query);
      //   const books = this.mapBooks(result);
      patchState(store, (state) => ({ ...state, books: result }));
    },
    async createBook(payload: Partial<Book>) {
      const { status, result } = await studyToolsService.postBook(payload);
      //   const subject = this.findSubject(result.subject);
      patchState(store, (state) => ({
        ...state,
        books: [result, ...state.books],
      }));
      return status;
    },
    // topics methods
    async getTopics(query: { [key: string]: any } = {}) {
      const result = await studyToolsService.getTopics(query);
      //   const topics = this.mapTopics(result);
      patchState(store, (state) => ({ ...state, topics: result }));
    },
    async createTopic(payload: Partial<Topic>) {
      const { status, result } = await studyToolsService.postTopic(payload);
      patchState(store, (state) => ({
        ...state,
        topics: [result, ...state.topics],
      }));
      return status;
    },
    // subjects methods
    async getSubjects(query: { [key: string]: any } = {}) {
      const subjects = await studyToolsService.getSubjects(query);
      patchState(store, (state) => ({ ...state, subjects: subjects }));
    },
    async createSubject(payload: Partial<Subject>) {
      const { status, result } = await studyToolsService.postSubject(payload);
      patchState(store, (state) => ({
        ...state,
        subjects: [result, ...state.subjects],
      }));
      return status;
    },
    // exams methods
    async getExams(query: { [key: string]: any } = {}) {
      const exams = await studyToolsService.getExams(query);
      patchState(store, (state) => ({ ...state, exams: exams }));
    },
    async getExam(id: string) {
      const exam = await studyToolsService.getExam(id);
      patchState(store, (state) => ({ ...state, selectedExam: exam }));
    },
    async createExam(payload: Partial<Exam>) {
      const { status, result } = await studyToolsService.postExam(payload);
      patchState(store, (state) => ({
        ...state,
        exams: [result, ...state.exams],
        examCart: [],
      }));
      return status;
    },
    async saveExamResult() {
      const exam = store.selectedExam() as Exam;
      if (!!exam) {
        const { status } = await studyToolsService.postExamResult({
          testID: exam._id,
          questions: exam.questions,
          topic: exam.topic,
          subject: exam.subject,
          source: exam.source,
        });
        patchState(store, (state) => ({
          ...state,

          selectedExam: null,
        }));
        return status;
      } else {
        return false;
      }
    },
    addExamQuestions(payload: number) {
      let newQuestions: ExamQuestion[] = [];
      for (let i = 1; i <= payload; i++) {
        newQuestions.push({ answer: '', selected: '' });
      }
      patchState(store, (state) => ({
        ...state,
        examCart: [...state.examCart, ...newQuestions],
      }));
    },
    setExamAnswer(payload: { item: ExamQuestion; answer: string }) {
      patchState(store, (state) => ({
        ...state,
        examCart: state.examCart.map((question) =>
          question == payload.item
            ? { ...question, answer: payload.answer }
            : question
        ),
      }));
    },
    markQuestion(payload: { item: ExamQuestion; answer: string }) {
      const selectedExam = store.selectedExam() as Exam;
      if (!!selectedExam) {
        patchState(store, (state) => ({
          ...state,
          selectedExam: {
            ...selectedExam,
            questions: selectedExam.questions.map((question) =>
              question == payload.item
                ? { ...question, selected: payload.answer }
                : question
            ),
          },
        }));
      }
    },
    findSubject(query: string) {
      return store
        .subjects()
        .find(
          (subject) => subject._id == query || subject.name == query
        ) as Subject;
    },
    findBook(query: string) {
      return store
        .books()
        .find((book) => book._id == query || book.name == query) as Book;
    },
    findTopic(query: string) {
      return store
        .topics()
        .find((topic) => topic._id == query || topic.name == query) as Topic;
    },
    // mapBooks(books: Book[]) {
    //   return books.map((book) => {
    //     const subject = this.findSubject(book.subject);
    //     return { ...book, subject: subject.name };
    //   });
    // },
    // mapTopics(topics: Topic[]) {
    //   return topics.map((topic) => {
    //     // const subject = this.findSubject(topic.subject);
    //     const book = this.findBook(topic.book);
    //     return { ...topic, subject: book.subject, book: book.name };
    //   });
    // },
    // async deleteBook(id: string) {
    //   const res = await studyToolsService.deleteBook(id);
    //   if (!!res.status) {
    //     patchState(store, (state) => ({
    //       ...state,
    //       books: state.books.filter((Book) => Book._id != id),
    //     }));
    //   }
    // },
  }))
);
