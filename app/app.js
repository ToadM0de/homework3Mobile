function initListeners() {
    $("#submit").on("click",  (e) => {
        e.preventDefault();
        
        let n = $("#name").val();
        let ag = $("#age").val();
        let cs = $("#classes").val();
        
        let newArrClasses = cs.split(",").map((item) => item.trim());
        
        let studentObj = {
            name: n,
            age: ag,
            classes: newArrClasses
        };
        $("#name").val("");
        $("#age").val("");
        $("#classes").val("");
        addStudent(studentObj);
    });
    $("#showLocal").on("click",  (e) => {
        getStudents();
    });
}

function addStudent(student) {
    let allStudents = JSON.parse(localStorage.getItem("students"));
    allStudents.push(student);

    localStorage.setItem("students", JSON.stringify(allStudents));
}

function getStudents() {
    $("#app").empty();
    let allStudents = JSON.parse(localStorage.getItem("students"));
    let studentString="<div>"
    $.each(allStudents, (index, student) => {
        studentString += `<p>name: ${student.name} Age: ${student.age}`;

        $.each(student.classes, (i, cls) => {
            studentString += `<span> ${cls}</span>, `;
        });
        studentString += "</p>";
    });
    studentString += "</div>";
    $("#app").html(studentString);
}

function connectToStorage() {
    if(localStorage){
        let students = localStorage.getItem("students");
        if(students){
            console.log("Students found in storage");
        }else {
            localStorage.setItem("students", JSON.stringify([]));
        }
        
    }else {
        console.log("local storage not supported");
    }
}
 
$(document).ready(function () {
    connectToStorage();
initListeners();
});