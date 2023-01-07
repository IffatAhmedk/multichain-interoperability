export class Course {
    name: any
    marks: null
    
    constructor(name) {
        this.name = name
        this.marks = null
    }

    setMarks(marks) {
        this.marks = marks
    }
}