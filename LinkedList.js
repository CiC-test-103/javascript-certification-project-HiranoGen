// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs/promises');
// const fs = require('fs').promises;  // File System module
/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  // The constructor should take in the head, tail, and length as parameters
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  // addStudent should be public, so that it can be called in the terminal commands
  addStudent(newStudent) {
    // TODO
    // Create a new node with the new student
    const newNode = new Node(newStudent);
    // If the list is empty, set the head to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Add the new node to the end of the list
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return `Student ${newNode.data.getName()} has been added`;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  // removeStudent should be public, so that it can be called in the terminal commands
  removeStudent(email) {
    // TODO
    // If the list is empty, return
    if (!this.head) {
      return "List is empty, no students to remove";
    }
    // Case 1: Head node is the target
    if (this.head.data.getEmail() === email) {
       const removedStudent = this.head.data;
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return `Student ${removedStudent.getName()} has been removed`;
    }
    // Case 2: Other nodes
    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        const removedStudent = current.next.data;
        current.next = current.next.next;
        if(!current.next) {
          this.tail = current;
        }
        this.length--;
        return `Student ${removedStudent.getName()} has been removed`;
      }
      current = current.next;
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;
    // Traverse the list to find the student
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data;
      }
      current = current.next;
    }
    // Return -1 if the student is not found
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    // Set the head to null and the length to 0
    this.head = null;
    this.tail = null;
    this.length = 0;
    // The implementation of 'clear' case in the terminal commands requires that 
    // you modify the clearStudents() method in LinkedList to be public. 
    // Remove the '#' to do so
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    // If the list is empty, log that there are no students
    let current = this.head;
    if (!current) {
      return "No students in the list";
    }
    let names = [];
    // Traverse the list to display the students
    while (current) {
      names.push(current.data.getName());
      current = current.next;
    }
    // Remove the trailing comma and space
    return names.join(', ');
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName(studentsArray = null) {
    // TODO
    let students = studentsArray || [];
    if (!studentsArray) { // If no array is passed in, create an array of students from the list
      let current = this.head;
      // Traverse the list to add the students to an array
      while (current) {
      students.push(current.data);
      current = current.next;
      }
    }
    // Sort the array by name
    return students.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    // filterBySpecialization should be returning an array of students (student objects),(not just names) 
    // also...much like the other filter functions, 
    // this array needs to be sorted alphabetically by student name
    // Filter the students by specialization and sort them by name
    let filtered = [];
    let current = this.head;
    while (current) {
      if (current.data.getSpecialization() === specialization) {
        filtered.push(current.data);
      }
      current = current.next;
    }
    // return this.#sortStudentsByName(filtered);
    return filtered.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // filterByMinAge, should really be filterByMinYear; 
    // the method should return an array of students (student objects), (not just names) who are at least minYear, 
    // sorted alphabetically by student name, and requires minYear (as a param passed in)
    // TODO
    // Filter the students by minYear and sort them by name
    const filtered = [];
    let current = this.head;
    while (current) {
      if (current.data.getYear() >= minYear) { 
        filtered.push(current.data);
      }
      current = current.next;
    }
    // return this.#sortStudentsByName(filtered);
    return filtered.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  
  async saveToJson(fileName) {
    // TODO
    // Use the fs module to write the LinkedList to a JSON file
    try {
      let studentsArray = [];
      let current = this.head;
      while (current) {
        studentsArray.push(
          {
            name: current.data.getName(),
            year: current.data.getYear(),
            email: current.data.getEmail(),
            specialization: current.data.getSpecialization()
          }
        );
        current = current.next;
      }
      await fs.writeFile(fileName, JSON.stringify(studentsArray, null, 2));
      console.log(`Data saved to ${fileName}`);
    } catch (error) {
      console.error(`Error saving data: ${error.message}`);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    // Use the fs module to read the JSON file and overwrite the LinkedList
    try {
      const data = await fs.readFile(fileName, 'utf8');
      const studentsArray = JSON.parse(data);
      this.clearStudents();
      // Add the students from the file to the list
      for (const studentData of studentsArray) {
        const student = new Student(
          studentData.name, 
          studentData.year, 
          studentData.email, 
          studentData.specialization
        );
        this.addStudent(student);
      };
      console.log(`Data loaded from ${fileName}`);
    } catch (error) {
      console.error(`Error loading data ${error.message}`); // Log an error if there is an issue
    }
  }
}


module.exports = { LinkedList }
