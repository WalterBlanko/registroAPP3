import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/database/db.service';

import { Student } from 'src/app/models/student';
import { Asignature } from 'src/app/models/asignature';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formData: FormGroup;
  public emailRequired: string;
  public passwordRequired: string;
  private student : Student[] = [];
  private asignature : Asignature[] = [];
  public urls: string[] = [];
  navegationExtras: NavigationExtras;

  constructor(
    private connection: DbService,
    private router: Router
  ) { 
    this.emailRequired = 'El correo es obligatorio \n';
    this.passwordRequired = 'La contraseña es obligatoria \n'
  }

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl('correo@duocuc.cl'),
      password: new FormControl('123456')
    });
  }

  onSubmit() {
    var email = this.formData.get('email').value;
    var password = this.formData.get('password').value;

    var data = {
      "email": email,
      "password": password
    }

    this.navegationExtras = {
      state : {
        data : data
      }
    }
    
    this.connection.searchMail(email).then(data => {
      // var c = data.student_email;
      // var p = data.student_password;

      this.validateLogin(email, password, data.student_email, data.student_password);
    });
  }

  registrarUsuario() {
    this.connection.addStudent('correo@duocuc.cl', '123456');
    this.connection.addStudent('prueba@duocuc.cl', 'juanitojuan');
    this.connection.addStudent('test@duocuc.cl', '110799');
    this.connection.addStudent('example@duocuc.cl', 'zeronotsukaima1');
    this.connection.addStudent('prototipo@duocuc.cl', 'passdeprueba');

    this.connection.addTeacher('profesorX@profesor.duocuc.cl', 'profesor1');
    this.connection.addTeacher('profesorXX@profesor.duocuc.cl', 'profesor2');
    this.connection.addTeacher('profesorXXX@profesor.duocuc.cl', 'profesor3');

    this.connection.addAsignature('ASY4131', 'Arquitectura de Software', 'D', '004', '10:00:00', '11:30:00', 'lunes', 'profesorX@profesor.duocuc.cl');
    this.connection.addAsignature('CSY4111', 'Calidad de Software', 'D', '004', '10:00:00', '11:30:00', 'martes', 'profesorXX@profesor.duocuc.cl');
    this.connection.addAsignature('PGY4121', 'Programación de aplicaciones moviles', 'D', '004', '10:00:00', '11:30:00', 'miercoles', 'profesorXXX@profesor.duocuc.cl');

    this.connection.addLesson('ASY4131', 'correo@duocuc.cl');
    this.connection.addLesson('CSY4111', 'correo@duocuc.cl');
    this.connection.addLesson('PGY4121', 'correo@duocuc.cl');

    this.connection.addAttendance(true, '20/10/2022', '10:25', 'correo@duocuc.cl', 'ASY4131');
    this.connection.addAttendance(false, '21/10/2022', null, 'correo@duocuc.cl', 'CSY4111');
    this.connection.addAttendance(true, '22/10/2022', '10:25', 'correo@duocuc.cl', 'PGY4121');
  }

  mostrarRamos() {
    this.connection.obtenerRamos()
      .then(data => {
        this.asignature = data;
        this.asignature.forEach(element => {
          console.log(element.asignature_name);
        })
      })
  }

  private validateLogin(email, password, c, p) {
    if( email != c || p != password ) {
      alert('Correo y/o contraseña incorrectos');
    } else {
      this.router.navigate(['/tabs'], this.navegationExtras);
    }
  }
}
