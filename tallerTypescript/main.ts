import { Course } from './course.js';
import{student} from './student.js';
import{dataStudent} from './dataStudent.js';
import { dataCourses } from './dataCourses.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const codigo: HTMLElement = document.getElementById("codigo")!;
const nombre: HTMLElement = document.getElementById("nombre")!;
const edad: HTMLElement = document.getElementById("edad")!;
const direccion: HTMLElement = document.getElementById("direccion")!;
const numero: HTMLElement = document.getElementById("telefono")!;
const cedula: HTMLElement = document.getElementById("cedula")!;

const buscarRango: HTMLInputElement = <HTMLInputElement> document.getElementById("rango")!;
const alto: HTMLInputElement = <HTMLInputElement> document.getElementById("alto")!;
const bajo: HTMLInputElement = <HTMLInputElement> document.getElementById("bajo")!;



btnfilterByName.onclick = () => applyFilterByName();

buscarRango.onclick = () => applyFilterByRange();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

codigo.innerHTML = `${dataStudent.codigo}`
nombre.innerHTML = dataStudent.nombe;
edad.innerHTML = dataStudent.edad;
direccion.innerHTML = dataStudent.direccion;
numero.innerHTML = dataStudent.telefono;
cedula.innerHTML = dataStudent.cedula;

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 function applyFilterByRange() {
    let ialto = alto.value;
    let ibajo = bajo.value;
    

    ialto = (ialto == null) ? '' : ialto;
    ibajo = (ibajo == null) ? '' : ibajo;
    clearCoursesInTable();

    var jalto = +ialto;
    var jbajo = +ibajo;

    let coursesFiltered: Course[] = searchCourseRangeHigh(jalto,dataCourses);
    let coursesFiltered2: Course[] = searchCourseRangeLow(jbajo, coursesFiltered);
    renderCoursesInTable(coursesFiltered2);
 }

 function searchCourseRangeHigh(palto:number, courses: Course[])
 {
    return courses.filter (c => c.credits <= palto);
 }
 function searchCourseRangeLow(pbajo:number, courses: Course[])
 {
    return courses.filter (c => c.credits >= pbajo);
 }

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}