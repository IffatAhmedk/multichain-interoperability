export class Course {
    name
    marks
    
    constructor(name) {
        this.name = name
        this.marks = null
    }

    setMarks(marks) {
        this.marks = marks
    }
}