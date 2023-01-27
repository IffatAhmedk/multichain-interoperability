import { Chain } from './model/chain.js'
import { Course } from './model/course.js'
import { Student } from './model/student.js'


async function main() {
  const chainDHA = new Chain(8382, 'FwwrdMXs51kzmq2B7eS6ncHf8QBbADYh8jASDWhuzgEr')
  const chainNED = new Chain(8370, '7AszFbcgETbaDLZ6FCmh2omXEo4N57SHxw8teFbickGS')

  const ICS = new Course('ICS')
  const automata = new Course('Automata')

  const iffat = await Student.createStudent('Iffat', chainNED, [ICS, automata]);
  const anas = await Student.createStudent('Anas', chainDHA, [ICS, automata]);


  chainNED.issueTokens({
    address: iffat.address,
    marks: 90,
    courseName: iffat.courses[0].name
  })
  chainNED.issueTokens({
    address: iffat.address,
    marks: 70,
    courseName: iffat.courses[1].name
  })

  chainDHA.issueTokens({
    address: anas.address,
    marks: 70,
    courseName: anas.courses[0].name
  })  
  chainDHA.issueTokens({
    address: anas.address,
    marks: 70,
    courseName: anas.courses[1].name
  })

  

}

const generateStudents = async function() {
  const iffat = new Student('Iffat', chainNED, [ICS, automata]);
  const anas = new Student('Anas', chainDHA, [ICS, automata]);
}



main()