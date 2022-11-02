import { Component, OnInit } from '@angular/core';
import { ApiRamosService } from 'src/app/services/API/api-ramos.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {

  constructor(
    private api: ApiRamosService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    var json = this.api.getAlumnos();

    json.subscribe((res) => {
      for( let i = 0; i < 4; i++ ) {
        console.log(res[i]);
      }
    }, (error) => {
      console.log(error);
    });
  }

  // createPost() {
  //   var post = {
  //     title: 'Titulo de prueba',
  //     body: 'Algún cuerpo',
  //     userId: 1
  //   }

  //   this.api.createPost(post).subscribe((success)=> {
  //     console.log(success);
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }
}
