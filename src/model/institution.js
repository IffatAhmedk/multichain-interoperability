import { Chain } from './chain.js'
import multichain from 'multichain-node'

export class Institution {
    chain
    name
    students
    courses

    constructor(name, chainName) {
        this.name = name
        this.students = []
        this.courses = []
        this.chain   = Chain.createChain(chainName)
    }

    addStudent(student) {
        this.students.push(student)
    }

    addCourse(course) {
        this.courses.push(course)
    }

    async createAsset(assetName, qty, units, details) {
        chain.create({ type: 'issue', name: assetName, open: true, details: details, qty: qty, units: units }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    }
}
