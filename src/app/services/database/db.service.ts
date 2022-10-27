import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Student } from '../../models/student';
import { Asignature } from 'src/app/models/asignature';
import { Lesson } from 'src/app/models/lesson';
import { Teacher } from 'src/app/models/teacher';
import { RouteConfigLoadEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  constructor(private platform: Platform, private sqlite: SQLite) {
    this.databaseConn();
  }

  //Creacion de Base de datos mas creacion de tablas 
  async databaseConn() {
    await this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'test',
        location: 'default',
      }).then((sqLite: SQLiteObject) => {
        this.storage = sqLite;
        this.createTableStudent();
        this.createTableTeacher();        
        this.createTableAsignature();
        this.createTableAttendance();
        this.createTableLesson();
      })
        .catch((error) => console.log(JSON.stringify(error)));
    });
  }

  private createTableStudent() {
    this.storage.executeSql(`
          CREATE TABLE IF NOT EXISTS student(
            student_email varchar(200) primary key,
            student_password varchar(200) not null
            );
          `, [])
          .then((res) => {
            console.log(JSON.stringify(res) + 'Tabla alumno creada');
          })
          .catch((error) => console.log(JSON.stringify(error)) + 'Error en tabla alumno');
  }

  private createTableTeacher() {
    this.storage.executeSql(`
      CREATE TABLE IF NOT EXISTS teacher(
        teacher_email varchar(200) primary key,
        teacher_password varchar(200)
      );
    `, [])
    .then((res) => {
      console.log(JSON.stringify(res) + 'tabla teacher creada con exito');
    })
    .catch((error) => console.log(JSON.stringify(error) + 'error en crear tabla teacher'));
  }

  private createTableAsignature() {
    this.storage.executeSql(`
          CREATE TABLE IF NOT EXISTS asignature(
            asignature_acronym varchar(6) primary key,
            asignature_name varchar(200),
            asignature_modality varchar(1),
            asignature_section varchar(6),
            asignature_hourMin date,
            asignature_hourMax date,
            asignature_day varchar(40),
            teacher_email varchar(200),
          FOREIGN KEY (teacher_email) references teacher(teacher_email)
            );
          `, [])
          .then((res) => {
            console.log(JSON.stringify(res) + 'Tabla asignature creada');
          })
          .catch((error) => console.log(JSON.stringify(error) + 'Error en tabla asignature'));
  }

  private createTableLesson() {
    this.storage.executeSql(`
      CREATE TABLE IF NOT EXISTS lesson(
        lesson_id integer primary key autoincrement,
        asignature_acronym varchar(6),
        student_email varchar(200),
      FOREIGN KEY (asignature_acronym) references asignature(asignature_acronym),
      FOREIGN KEY (student_email) references student(student_email)
      );
    `, [])
      .then((res) => {
        console.log(JSON.stringify(res) + 'tabla lesson creada con exito')
      })
      .catch((error) => {
        console.log(JSON.stringify(error) + 'error en crear tabla lesson');
      })
  }

  private createTableAttendance() {
    this.storage.executeSql(`
      CREATE TABLE IF NOT EXISTS attendance(
        attendance_id integer primary key autoincrement,
        attendance boolean,
        attendance_date date,
        attendance_hour date,
        student_email varchar(200),
        asignature_acronym varchar(6),
      FOREIGN KEY (student_email) references student(student_email),
      FOREIGN KEY (asignature_acronym) references asignature(asignature_acronym)
      );
    `, [])
    .then((res) => {
      console.log(JSON.stringify(res) + 'tabla attendance creada con exito');
    })
    .catch((error) => console.log(JSON.stringify(error) + 'error en crear tabla attendance'));
  }

  public addStudent(email, password) {
    this.storage.executeSql('insert into student (student_email, student_password) values ("' + email + '", "' + password + '")', [])
      .then(() => {
        console.log('Registrado con exito');
      }, (error) => {
        console.log('Error al registrar: ' + error.message);
      })
  }

  public addTeacher(email, password) {
    this.storage.executeSql('insert into teacher (teacher_email, teacher_password) values ("' + email + ', ' + password + '")', [])
      .then(() => {
        console.log('Registrado con exito');
      }, (error) => {
        console.log('Error al registrar: ' + error.message);
      })
  }

  public addAsignature(agronym, name, modality, section, hourMin, hourMax, day, teacher_email, student_email) {
    this.storage.executeSql('insert into asignature (asignature_acronym, asignature_name, asignature_modality, asignature_section, asignature_hourMin, asignature_hourMax, teacher_email) values ("' + agronym + ', ' + name +', '+ modality +', ' + section + ', ' + hourMin + ', ' + hourMax + ', ' + day + ', ' + teacher_email + ', ' + student_email + '")', [])
      .then(() => {
        console.log('Ramo ingresado');
      }, (error) => {
        console.log('Error al ingresar ramo: ' + error.message);
      });
  }

  public addLesson(acronym, email) {
    this.storage.executeSql('insert into lesson (asignature_acronym, student_email) values ("' + acronym + ', ' + email + '")', [])
      .then(() => {
        console.log('Clase registrada con exito');
      }, (error) => {
        console.log('Error al registrar la clase: ' + error.message);
      })
  }

  public addAttendance(attendance, date, hour, student_email, asignature_acronym) {
    this.storage.executeSql('insert into attendance (attendance, attendance_date, attendance_hour, student_email, asignature_acronym) values ("' + attendance + ', ' + date + ', ' + hour + ', ' + student_email + ', ' + asignature_acronym + '")', [])
      .then(() => {
        console.log('Asistencia ingresada con exito');
      }, (error) => {
        console.log('Error al ingresar asistencia: ' + error.message);
      })
  }

  public searchMail(correo): Promise<Student> {
    return this.storage.executeSql('select * from alumno where correo_alumno = ?', [correo])
      .then((res) => {
        return {
          student_email: res.rows.item(0).student_email,
          student_password: res.rows.item(0).student_password
        }
      })
  }

  public updateUser(email, password) {
    return this.storage.executeSql(`update alumno set password_alumno = '${password}' where correo_alumno = '${email}'`)
      .then(data => {
        alert(data + ' Cambio de contraseña exitoso');
      })
      .catch((error) => {
        console.log(error + ' ' + email + ' ' + password)
      });
  }

  public getStudents() {
    return this.storage.executeSql("SELECT * FROM student", [])
      .then((data) => {
        let user: Student[] = [];

        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            user.push({
              student_email: data.rows.item(i).student_email,
              student_password: data.rows.item(i).student_password
            });
          }
        }

        return user;
      }, err => {
        console.log('Error: ', err);
        return [];
      });
  }

  public obtenerRamos() {
    return this.storage.executeSql('select * from asignature', [])
      .then((data) => {
        let asignature: Asignature[] = [];

        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            asignature.push({
              asignature_acronym: data.rows.item(i).asignature_acronym,
              asignature_name: data.rows.item(i).asignature_name,
              asignature_modality: data.rows.item(i).asignature_modality,
              asignature_section: data.rows.item(i).asignature_section,
              asignature_hourMin: data.rows.item(i).asignature_hourMin,
              asignature_hourMax: data.rows.item(i).asignature_hourMax,
              asignature_day: data.rows.item(i).asignature_day,
              teacher_email: data.rows.item(i).teacher_email
            });
          }
        }
        return asignature;
      }, error => {
        console.log('error: ', error);
        return [];
      })
  }
}