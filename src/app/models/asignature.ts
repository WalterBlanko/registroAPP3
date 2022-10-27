export class Asignature {
    constructor(
        public asignature_acronym: string = "",
        public asignature_name: string = "",
        public asignature_modality: string = "",
        public asignature_section: string = "",
        public asignature_hourMin: Date,
        public asignature_hourMax: Date,
        public asignature_day: string = "",
        public teacher_email: string = ""
    ) { }
}