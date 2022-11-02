import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(
    private router: Router,
    private storage: Storage
    ){}

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.get( INTRO_KEY );
    if( hasSeenIntro && (hasSeenIntro.value === 'true') ) {
      return true;
    } else {
      this.router.navigateByUrl('/', { replaceUrl: true });
      return false;
    }
  }
}
