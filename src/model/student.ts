import { Chain } from './chain'

export class Student {
    name: string
    courses: any
    address: string

    constructor(name: string, chain: Chain) {
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