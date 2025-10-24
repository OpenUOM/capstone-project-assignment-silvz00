import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  
  studentData: any[] = [];
  allStudents: any[] = [];

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id : number){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData() {
    this.service.getStudentData().subscribe(
      (response) => {
        // Flatten nested arrays
        this.studentData = Object.values(response);
        this.allStudents = [...this.studentData]; // store full copy for search
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  deleteStudent(itemid : number){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }

  search(value: string) {
    const term = value.toLowerCase().trim();

    if (!term) {
      this.studentData = [...this.allStudents];
      return;
    }

    this.studentData = this.allStudents.filter((student: any) =>
      student.name.toLowerCase().includes(term) ||
      student.hometown.toLowerCase().includes(term) ||
      student.age.toString().includes(term)
    );
  }

}
