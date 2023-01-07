import { Chain } from './chain'

export class Institution {
    chain
    name
    students
    courses

    constructor(name, chainName) {
        this.name = name
        this.students = []
        this.courses = []
        // this.chain = Chain.createChain(chainName)
    }

    addStudent(student) {
        this.students.push(student)
    }

    addCourse(course) {
        this.courses.push(course)
    }
}
