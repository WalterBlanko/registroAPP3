import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../../models/user';
import { Ramo } from 'src/app/models/ramos';
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
        this.storage.executeSql(`
          CREATE TABLE IF NOT EXISTS alumno(
            correo_alumno varchar(200) primary key,
            password_alumno varchar(200) not null
            );
          `, [])
          .then((res) => {
            console.log(JSON.stringify(res));
          })
          .catch((error) => console.log(JSON.stringify(error)));
        this.storage.executeSql(`
          CREATE TABLE IF NOT EXISTS ramo(
            nombre_ramo varchar(200) primary key
            );
          `, [])
          .then((res) => {
            console.log(JSON.stringify(res));
          })
          .catch((error) => console.log(JSON.stringify(error)));
      })
        .catch((error) => console.log(JSON.stringify(error)));
    });
  }

  public addUser(correo, password) {
    this.storage.executeSql('insert into alumno (correo_alumno, password_alumno) values ("' + correo + '", "' + password + '")', [])
      .then(() => {
        console.log('Registrado con exito');
      }, (error) => {
        console.log('Error al registrar: ' + error.message);
      })
  }



  public searchMail(correo): Promise<User> {
    return this.storage.executeSql('select * from alumno where correo_alumno = ?', [correo])
      .then((res) => {
        return {
          email: res.rows.item(0).correo_alumno,
          password: res.rows.item(0).password_alumno
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

  public obtenerUsuarios() {
    return this.storage.executeSql("SELECT * FROM alumno", [])
      .then((data) => {
        let user: User[] = [];

        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            user.push({
              email: data.rows.item(i).correo_alumno,
              password: data.rows.item(i).password_alumno
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
    return this.storage.executeSql('select * from ramo', [])
      .then((data) => {
        let ramo: Ramo[] = [];

        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            ramo.push({
              nombre_ramo: data.rows.item(i).nombre_asignatura
            });
          }
        }
        return ramo;
      }, error => {
        console.log('error: ', error);
        return [];
      })
  }

  public addAsignature(asignature) {
    this.storage.executeSql('insert into ramo (nombre_ramo) values ("' + asignature + '")', [])
      .then(() => {
        console.log('Ramo ingresado');
      }, (error) => {
        console.log('Error al ingresar ramo: ' + error.message);
      });
  }
}
