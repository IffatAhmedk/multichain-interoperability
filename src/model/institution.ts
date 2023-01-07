import { Chain } from './chain'

export class Institution {
    chain: Chain
    name: string
    students: any
    courses: any

    constructor(name: string, chain: Chain) {
        this.name = name
        this.students = []
        this.courses = []
        this.chain = chain
    }

    addStudent(student) {
        this.students.push(student)
    }

    addCourse(course) {
        this.courses.push(course)
    }
}
