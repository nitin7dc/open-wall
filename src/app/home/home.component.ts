import {Component, OnInit, ModuleWithProviders} from '@angular/core';
import {Router} from '@angular/router';

import {ImagesService} from '../shared';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  images = [];
  loading = true;
  errorMessage = '';
  searchEvent: any;
  total = 0;
  total_pages = 0;
  timeout = false;

  constructor(private imageService: ImagesService, private router: Router) {
  }

  ngOnInit() {
    this.random();
    this.search();
  }

  random() {
    this.errorMessage = '';
    this.imageService.random()
      .subscribe(images => {
        this.images = images;
        this.loading = false;
        this.errorMessage = '';
      }, error => {
        this.loading = false;
        this.errorMessage = error;
      });
  }

  search() {
    this.errorMessage = '';
    this.searchEvent = this.imageService.getSearchEvent()
      .subscribe(value => {
        if (value.hasOwnProperty('init')) {
          this.loading = true;
          this.images = [];
          this.errorMessage = '';
        } else if (value.hasOwnProperty('errorMessage')) {
          this.loading = false;
          this.errorMessage = value.errorMessage;
          this.timeout = true;
        } else if (value.hasOwnProperty('results')) {
          this.loading = false;
          this.total = value.total;
          this.total_pages = value.total_pages;
          this.images = value.results;
          this.errorMessage = '';
        } else {
          this.loading = false;
          this.random();
          this.errorMessage = '';
        }
      }, error => {
        this.loading = false;
        this.errorMessage = error;
      });
  }

  more() {
    this.errorMessage = '';
    this.loading = true;
    this.imageService.more()
      .subscribe(images => {
        this.images = this.images.concat(images);
        this.loading = false;
        this.errorMessage = '';
      }, error => {
        this.loading = false;
        this.errorMessage = error;
      });
  }

  fullImage(image) {
    this.imageService.cache[image.id] = image;

    // if (window.innerWidth < 500) {
    //   window.open('http://localhost:4200/' + 'image/' + image.id, '_blank');
    // } else {
    //   this.router.navigateByUrl('/image/' + image.id);
    // }
    // this.router.navigateByUrl('/image/' + image.id);
    window.open(environment.serverUrl + '/image/' + image.id, '_blank');

  }

}
