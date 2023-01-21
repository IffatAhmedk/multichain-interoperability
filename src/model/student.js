import { Chain } from './chain.js'
import { Course } from './course.js'

export class Student {
    name
    courses
    address
    chain

    constructor(name, chain, courses, address) {
        this.name = name
        this.chain = chain
        this.courses = courses ?? []
        this.address = address
        
    }

    static createStudent = async (name, chain, courses) => {
        const address = await chain.createAddress();
        return new Student(name, chain, courses, address);
    }

    addCourse(course) {
        this.courses.push(course)
    }
}