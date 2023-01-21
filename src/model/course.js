import multichain from 'multichain-node'


export class Course {
    name
    totalMarks
    marksObtained
    
    constructor(name) {
        this.name = name
        this.totalMarks = 100
    }

    
    setMarks(chain, address, name, marks) {
        return new Promise((resolve, reject) => {
            chain.issue({ address, name, marks }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}