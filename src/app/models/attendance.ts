export class Attendance {
    constructor(
        public attendance_id: number,
        public attendance: boolean,
        public attendance_date: Date,
        public attendance_hour: Date,
        public student_email: string = "",
        public asignature_acronym: string = "" 
    ) {
        
    }
}