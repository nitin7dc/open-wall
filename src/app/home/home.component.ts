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
  searchQuery = '';
  page = 0;
  total = 0;
  total_pages = 0;
  searchActive = false;

  constructor(private imageService: ImagesService, private router: Router) {
  }

  ngOnInit() {
    this.random();
    this.search();
  }

  random() {
    this.loading = true;
    this.page += 1;
    this.errorMessage = '';
    this.imageService.random(this.page)
      .subscribe(images => {
        images.forEach(image => this.images.push(image));
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
        this.searchActive = true;
        if (value.hasOwnProperty('loading') && (value.page === 0)) {

          this.images = [];
          this.page = 0;
          this.searchQuery = value.query;
          this.loading = true;

        } else if (value.hasOwnProperty('loading')) {

          this.loading = true;

        } else if (value.hasOwnProperty('errorMessage')) {

          this.errorMessage = value.errorMessage;
          this.loading = false;

        } else if (value.hasOwnProperty('results')) {

          this.loading = false;
          this.total = value.total;
          this.total_pages = value.total_pages;
          value.results.forEach(image => this.images.push(image));
          this.page += 1;

        } else {

          this.searchActive = false;
          this.errorMessage = '';
          this.page = 0;
          this.searchQuery = '';
          this.images = [];
          this.random();

        }
      }, error => {

        this.loading = false;
        this.errorMessage = error;

      });
  }


  more() {
    if (this.searchActive) {
      this.imageService.search(this.searchQuery, this.page);
    } else {
      this.random();
    }
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
