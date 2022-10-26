import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DbService } from 'src/app/services/database/db.service';
import { User } from 'src/app/models/user';
import { Ramo } from 'src/app/models/ramos';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formData: FormGroup;
  public emailRequired: string;
  public passwordRequired: string;
  private user : User[] = [];
  private ramo : Ramo[] = [];
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
      var c = data.email;
      var p = data.password;

      this.validateLogin(email, password, c, p);
    });
  }

  registrarUsuario() {
    this.connection.addUser('correo@duocuc.cl', '123456');
    this.connection.addUser('prueba@duocuc.cl', 'juanitojuan');
    this.connection.addUser('test@duocuc.cl', '110799');
    this.connection.addUser('example@duocuc.cl', 'zeronotsukaima1');
    this.connection.addUser('prototipo@duocuc.cl', 'passdeprueba');

    this.connection.addAsignature('Programacion');
    this.connection.addAsignature('Matematicas');
    this.connection.addAsignature('Lenguaje');
  }

  mostrarRamos() {
    this.connection.obtenerRamos()
      .then(data => {
        this.ramo = data;
        this.ramo.forEach(element => {
          console.log(element.nombre_ramo);
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
