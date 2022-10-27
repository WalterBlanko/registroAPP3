import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/database/db.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  public formData: FormGroup;
  private student: Student[] = [];

  constructor(
    private connection: DbService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl('correo@duocuc.cl'),
      password: new FormControl('12345678'),
      confirmPassword: new FormControl('12345678')
    });
  }

  onSubmit() {
    let email = this.formData.get('email').value;
    let password = this.formData.get('password').value;
    let confirmPassword = this.formData.get('confirmPassword').value;

    this.validateUpdate(email, password, confirmPassword);
  }

  private validateUpdate(email, password, confirmPassword) {
    var updateUser: Student = new Student;

    updateUser.student_email = email;
    updateUser.student_password = password;

    if( password != confirmPassword ) {
      alert('Las contraseñas no coinciden')
    } else {
      this.connection.updateUser(email, password);
    }
  }

  mostrarUsuarios() {
    console.log('funcionando');
    this.connection.getStudents().then(data => {
      this.student = data;
      this.student.forEach(element => {
        console.log(element.student_email + ' ' + element.student_password);
      });
    })
  }

  mostrarUsuario() {
    console.log('Funcionando')
    var email = this.formData.get('email').value;

    this.connection.searchMail(email).then(data => {
      console.log(data.student_email + ' ' + data.student_password);
    });
  }
}
