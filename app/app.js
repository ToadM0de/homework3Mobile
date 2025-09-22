function initListeners() {
    $("#submit").on("click",  (e) => {
        e.preventDefault();
        
        let n = $("#name").val();
        let ag = $("#age").val();
        let cs = $("#classes").val();
        let pnNmb = $("#number").val();
        let em = $("#email").val();
        
        let newArrClasses = cs.split(",").map((item) => item.trim());
        
        let studentObj = {
            name: n,
            age: ag,
            classes: newArrClasses,
            number: pnNmb,
            email: em
        };
        $("#name").val("");
        $("#age").val("");
        $("#classes").val("");
        $("#number").val("");
        $("#email").val("");
        addStudent(studentObj);
    });
    $("#showLocal").on("click",  (e) => {
        getStudents();
    });
}

function addStudent(student) {
    let allStudents = JSON.parse(localStorage.getItem("students"));
    if (!allStudents) allStudents = [];
    allStudents.push(student);
    localStorage.setItem("students", JSON.stringify(allStudents));
}

function getStudents() {
    $("#app").empty();
    let allStudents = JSON.parse(localStorage.getItem("students"));
    let studentString="<div>"
    $.each(allStudents, (index, student) => {
        studentString += `<p>Name: ${student.name} Age: ${student.age} Phone Number: ${student.number} Email: ${student.email} Classes: `;

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