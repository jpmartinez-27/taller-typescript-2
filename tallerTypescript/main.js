import { dataStudent } from './dataStudent.js';
import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var codigo = document.getElementById("codigo");
var nombre = document.getElementById("nombre");
var edad = document.getElementById("edad");
var direccion = document.getElementById("direccion");
var numero = document.getElementById("telefono");
var cedula = document.getElementById("cedula");
var buscarRango = document.getElementById("rango");
var alto = document.getElementById("alto");
var bajo = document.getElementById("bajo");
btnfilterByName.onclick = function () { return applyFilterByName(); };
buscarRango.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
codigo.innerHTML = "" + dataStudent.codigo;
nombre.innerHTML = dataStudent.nombe;
edad.innerHTML = dataStudent.edad;
direccion.innerHTML = dataStudent.direccion;
numero.innerHTML = dataStudent.telefono;
cedula.innerHTML = dataStudent.cedula;
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByRange() {
    var ialto = alto.value;
    var ibajo = bajo.value;
    ialto = (ialto == null) ? '' : ialto;
    ibajo = (ibajo == null) ? '' : ibajo;
    clearCoursesInTable();
    var jalto = +ialto;
    var jbajo = +ibajo;
    var coursesFiltered = searchCourseRangeHigh(jalto, dataCourses);
    var coursesFiltered2 = searchCourseRangeLow(jbajo, coursesFiltered);
    renderCoursesInTable(coursesFiltered2);
}
function searchCourseRangeHigh(palto, courses) {
    return courses.filter(function (c) { return c.credits <= palto; });
}
function searchCourseRangeLow(pbajo, courses) {
    return courses.filter(function (c) { return c.credits >= pbajo; });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
