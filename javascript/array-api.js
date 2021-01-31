// array to string
{
    const fruits = ['apple', 'banana', 'oragne'];
    const result = fruits.join();
    console.log(result);
}

// string to array
{
    const fruits = 'apple,banana,oragne';
    const result = fruits.split(',', 2);
    console.log(result);
}

// make this [5, 4, 3, 2, 1]
{
    const array = [1, 2, 3, 4, 5];    
    const result = array.reverse();
    //const result = array.sort((a, b) => b-a);
    console.log(result);
    console.log(array); //배열 자체를 변경

}

// make new array without the first two elements
{
    const array = [1, 2, 3, 4, 5];
    const result = array.slice(2, 5);
    
    console.log(result);
    console.log(array);

    //splice는 배열 자체 변경

}

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}

const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];

// find a student with the score 90
{
    console.log(students);    
    const result = students.find((student) => student.score === 90);
    //find => 첫번째 true 값 return
    console.log(result);
}

// make an array of enrolled students
{
    const result = students.filter((student) => student.enrolled);
    console.log(result);
}

// make an array containing only the students' scrore
{
    const result = students.map((student) => student.score);
    console.log(result);
}

// check if there is a student with the score lower than 50
{
    
    const result = students.some((student) => student.score < 50); //하나라도 some, 모두 every
    console.log(result);
    
}

// compute student's average score
{
    const result = students.reduce((prev, curr) => prev + curr.score, 0); //initial 값 0 set

    console.log(result/students.length);
}

// make a string containing all the scores
{
    const result = students
    .map((student) => student.score)
    .join();

    console.log(result);

}

// ascending order
{
    const result = students
    .map((student) => student.score)
    .sort((a, b) => a - b)
    .join();

    console.log(result);
}