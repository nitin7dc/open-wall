import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {saveAs} from 'file-saver';
import {environment} from '../../environments/environment';

import {ImagesService} from '../shared';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  loading = false;
  errorMessage = '';
  image: any;
  url = '';
  utm = '?utm_source=open-wall&utm_medium=referral&utm_campaign=api-credit';
  clientId: string = environment.applicationId;

  constructor(private route: ActivatedRoute,
              private imageService: ImagesService,
              private router: Router,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.image = this.imageService.cache[id];

    if (this.image) {
      this.url = this.image.urls.regular;
    } else {
      this.get(id);
    }
  }

  back() {
    this.router.navigateByUrl('');
  }

  close() {
    window.close();
  }

  get(id: string) {
    this.loading = true;
    this.errorMessage = '';
    this.imageService.get(id)
      .subscribe(value => {
        this.image = value;
        this.url = this.image.urls.regular;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.errorMessage = error;
      });
  }

  download() {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', encodeURI(this.image.links.download));
    anchor.setAttribute('target', '_system');
    anchor.setAttribute('download', this.image.id + '.jpeg');
    anchor.click();
  }

}
