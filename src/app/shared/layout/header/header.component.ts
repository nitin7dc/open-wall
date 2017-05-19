import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hideMenu = true;
  hideHeader = false;

  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
        this.hideHeader = false;
        if (event instanceof NavigationEnd) {
          if (event.url.indexOf('/image/') > -1) {
            this.hideHeader = true;
          }
        }
      });
  }

  ngOnInit() {
  }

  show(event) {
    this.hideMenu = !this.hideMenu;
    event.stopPropagation();
  }

  close(event) {
    if (!this.hideMenu) {
      this.hideMenu = true;
    }
  }

  go(path) {
    this.hideMenu = true;
    if (path === 'github') {
      window.open('https://github.com/nitin7dc/open-wall', '_blank');
    } else {
      this.router.navigateByUrl(path);
    }

  }

}
