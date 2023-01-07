import { Chain } from './chain'

export class Student {
    name
    courses
    address

    constructor(name, chain) {
        this.name = name
        this.courses = []

        chain.createAddress().then(address => {
            this.address = address
        })
    }

    addCourse(course) {
        this.courses.push(course)
    }
}