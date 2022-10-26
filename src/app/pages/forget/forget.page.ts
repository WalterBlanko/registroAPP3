import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/database/db.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  public formData: FormGroup;
  private user: User[] = [];

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
    var updateUser: User = new User;

    updateUser.email = email;
    updateUser.password = password;

    if( password != confirmPassword ) {
      alert('Las contraseñas no coinciden')
    } else {
      this.connection.updateUser(email, password);
    }
  }

  mostrarUsuarios() {
    console.log('funcionando');
    this.connection.obtenerUsuarios().then(data => {
      this.user = data;
      this.user.forEach(element => {
        console.log(element.email + ' ' + element.password);
      });
    })
  }

  mostrarUsuario() {
    console.log('Funcionando')
    var email = this.formData.get('email').value;

    this.connection.searchMail(email).then(data => {
      console.log(data.email + ' ' + data.password);
    });
  }
}
