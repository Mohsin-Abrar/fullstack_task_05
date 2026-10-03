import formatResult, { 
  DEPARTMENT_NAME, 
  calculateTotal, 
  calculateAverage, 
  getGrade, 
  getStatus as checkPassFail 
} from './studentUtils.js';

function executeTask1() {
  const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
  const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
  const student = { name: "Mohsin", rollNumber: "242804", department: "Computer Science", semester: 6 };
  const cgpaList = [3.10, 3.45, 2.90, 3.75, 3.20];

  const allCourses = [...coreCourses, ...electiveCourses];

  const copyCourses = [...allCourses, "Software Engineering"];

  const updatedStudent = { ...student, semester: 5, cgpa: 3.45 };

  const enrollStudent = (name, ...courses) => {
    return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
  };

  const calculateAverageCGPA = (...cgpas) => {
    const sum = cgpas.reduce((acc, curr) => acc + curr, 0);
    return (sum / cgpas.length).toFixed(2);
  };

  const highestCGPA = Math.max(...cgpaList);

  const getStudentInfo = (name, department = "Computer Science") => {
    return `Department (default): ${department}`;
  };

  const task1Container = document.getElementById("task1-output");
  task1Container.innerHTML = `
    <p><strong>Core Courses:</strong> ${coreCourses.join(", ")}</p>
    <p><strong>Elective Courses:</strong> ${electiveCourses.join(", ")}</p>
    <p><strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}</p>
    <p><strong>Copy after adding a course (${copyCourses.length}):</strong> ${copyCourses.join(", ")}<br>
    <em>Original still has ${allCourses.length} courses</em></p>
    <hr>
    <p><strong>Original Student:</strong> ${student.name}, Semester ${student.semester}</p>
    <p><strong>Updated Student:</strong> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}</p>
    <hr>
    <p>${enrollStudent("Mohsin", "Web Development", "Database Systems", "Artificial Intelligence")}</p>
    <p><strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpaList)}</p>
    <p><strong>Highest CGPA:</strong> ${highestCGPA}</p>
    <p><strong>${getStudentInfo("Ali")}</strong></p>
  `;
}

function executeTask2() {
  document.getElementById("task2-dept").textContent = `Department: ${DEPARTMENT_NAME}`;

  const students = [
    { name: "Mohsin", rollNumber: "BSCS-001", assignment: 18, midterm: 24, finalExam: 40 },
    { name: "Ahmed", rollNumber: "BSCS-002", assignment: 15, midterm: 20, finalExam: 32 },
    { name: "ALI", rollNumber: "BSCS-014", assignment: 10, midterm: 15, finalExam: 23 },
    { name: "Hassan", rollNumber: "BSCS-031", assignment: 16, midterm: 22, finalExam: 37 }
  ];

  const cardsContainer = document.getElementById("task2-cards");
  cardsContainer.innerHTML = "";

  students.forEach((student) => {
    const { name, rollNumber, assignment, midterm, finalExam } = student;
    const total = calculateTotal(assignment, midterm, finalExam);
    const avg = calculateAverage(total, 3);
    const grade = getGrade(total);
    const status = checkPassFail(total);

    const formattedHeader = formatResult(name, rollNumber, total);

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3";
    col.innerHTML = `
      <div class="card h-100 border-${status === 'Pass' ? 'success' : 'danger'}">
        <div class="card-body">
          <h6 class="card-title fw-bold">${formattedHeader}</h6>
          <p class="card-text mb-1"><strong>Average:</strong> ${avg}</p>
          <p class="card-text mb-1"><strong>Grade:</strong> ${grade}</p>
          <p class="card-text mb-0"><strong>Status:</strong> <span class="badge bg-${status === 'Pass' ? 'success' : 'danger'}">${status}</span></p>
        </div>
      </div>
    `;
    cardsContainer.appendChild(col);
  });
}

function verifyStudent(roll, callback) {
  setTimeout(() => {
    if (!roll || roll.trim() === "") {
      callback("Roll number is required", null);
    } else {
      callback(null, `Student ${roll} verified`);
    }
  }, 1000);
}

function loadExamPaper(callback) {
  setTimeout(() => {
    callback("Exam paper loaded");
  }, 1500);
}

function submitAnswers(callback) {
  setTimeout(() => {
    callback("Answers submitted");
  }, 2000);
}

function generateResult(callback) {
  setTimeout(() => {
    callback("Result generated: 82 marks");
  }, 1000);
}

function runExamWorkflow(rollNumber) {
  const output = document.getElementById("task3-output");
  output.textContent = "Exam workflow started...\n";

  verifyStudent(rollNumber, (err, step1Msg) => {
    if (err) {
      output.textContent += `Error: ${err}\n`;
      return;
    }
    output.textContent += `Step 1: ${step1Msg}\n`;

    loadExamPaper((step2Msg) => {
      output.textContent += `Step 2: ${step2Msg}\n`;

      submitAnswers((step3Msg) => {
        output.textContent += `Step 3: ${step3Msg}\n`;

        generateResult((step4Msg) => {
          output.textContent += `Step 4: ${step4Msg}\n`;
          output.textContent += `Exam completed successfully!\n`;
        });
      });
    });
  });
}

const studentDB = [
  { name: "Mohsin", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, assignment: 18, midterm: 24, finalExam: 40 },
  { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 4, assignment: 15, midterm: 20, finalExam: 32 },
  { name: "Ali", rollNumber: "BSCS-023", department: "Computer Science", semester: 6, assignment: 19, midterm: 25, finalExam: 42 },
  { name: "Faiz", rollNumber: "BSCS-014", department: "Computer Science", semester: 2, assignment: 10, midterm: 15, finalExam: 23 },
  { name: "Ahsin", rollNumber: "BSCS-031", department: "Computer Science", semester: 8, assignment: 16, midterm: 22, finalExam: 37 }
];

function findStudent(rollNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = studentDB.find((s) => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());
      if (student) {
        resolve(student);
      } else {
        reject("Student not found");
      }
    }, 1000);
  });
}

function calculateResult(student) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { assignment, midterm, finalExam } = student;
      const total = calculateTotal(assignment, midterm, finalExam);
      const average = calculateAverage(total, 3);
      const grade = getGrade(total);
      const status = total >= 50 ? "Pass" : "Fail";

      resolve({ ...student, total, average, grade, status });
    }, 1000);
  });
}

function searchWithPromises(rollNumber) {
  const output = document.getElementById("task4-output");
  document.getElementById("task4-cards").innerHTML = "";
  document.getElementById("task4-stats").innerHTML = "";

  output.textContent = "Searching...\n----------------------------------------------\n";

  findStudent(rollNumber)
    .then((student) => calculateResult(student))
    .then(({ name, rollNumber, department, semester, total, average, grade, status }) => {
      output.textContent += `Student: ${name}\nRoll No: ${rollNumber}\nDepartment: ${department}\nSemester: ${semester}\nTotal: ${total}\nAverage: ${average}\nGrade: ${grade}\nStatus: ${status}\n`;
    })
    .catch((err) => {
      output.textContent += `Error: ${err}\n`;
    })
    .finally(() => {
      output.textContent += "----------------------------------------------\nSearch completed";
    });
}

async function showResult(rollNumber) {
  const output = document.getElementById("task4-output");
  document.getElementById("task4-cards").innerHTML = "";
  document.getElementById("task4-stats").innerHTML = "";

  output.textContent = "Searching...\n----------------------------------------------\n";

  try {
    const student = await findStudent(rollNumber);
    const result = await calculateResult(student);
    const { name, rollNumber: roll, department, semester, total, average, grade, status } = result;

    output.textContent += `Student: ${name}\nRoll No: ${roll}\nDepartment: ${department}\nSemester: ${semester}\nTotal: ${total}\nAverage: ${average}\nGrade: ${grade}\nStatus: ${status}\n`;
  } catch (error) {
    output.textContent += `Error: ${error}\n`;
  } finally {
    output.textContent += "----------------------------------------------\nSearch completed";
  }
}

async function loadAllResults() {
  const output = document.getElementById("task4-output");
  const cardsContainer = document.getElementById("task4-cards");
  const statsContainer = document.getElementById("task4-stats");

  output.textContent = "Loading all student results simultaneously...";
  cardsContainer.innerHTML = "";

  try {
    const resultPromises = studentDB.map((student) => calculateResult(student));
    const results = await Promise.all(resultPromises);

    output.textContent = "----------------------------------------------\n";
    let passCount = 0;
    let failCount = 0;

    results.forEach(({ name, rollNumber, grade, status }) => {
      output.textContent += `Student: ${name.padEnd(10)} Roll No: ${rollNumber.padEnd(10)} Grade: ${grade.padEnd(4)} Status: ${status}\n`;

      if (status === "Pass") passCount++;
      else failCount++;
    });

    output.textContent += "----------------------------------------------";

    statsContainer.innerHTML = `
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="fw-bold">Final Statistics</h5>
          <p class="mb-1"><strong>Total Students:</strong> ${results.length}</p>
          <p class="mb-1 text-success"><strong>Passed Students:</strong> ${passCount}</p>
          <p class="mb-0 text-danger"><strong>Failed Students:</strong> ${failCount}</p>
        </div>
      </div>
    `;
  } catch (err) {
    output.textContent = `Error loading results: ${err}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  executeTask1();
  executeTask2();

  document.getElementById("btn-valid-workflow").addEventListener("click", () => runExamWorkflow("BSCS-001"));
  document.getElementById("btn-invalid-workflow").addEventListener("click", () => runExamWorkflow(""));

  document.getElementById("btn-search-then").addEventListener("click", () => {
    const roll = document.getElementById("search-roll").value;
    searchWithPromises(roll);
  });

  document.getElementById("btn-search-async").addEventListener("click", () => {
    const roll = document.getElementById("search-roll").value;
    showResult(roll);
  });

  document.getElementById("btn-load-all").addEventListener("click", loadAllResults);
});