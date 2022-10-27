export class Lesson {
    constructor(
        public lesson_id: number,
        public asignature_acronym: string = "",
        public student_email: string = ""
        ) {
}
}