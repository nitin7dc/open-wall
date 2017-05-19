import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {ImagesService} from '../shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  constructor(private imageService: ImagesService) {}

  ngOnInit() {
    this.queryChanged
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(query => {
        this.query = query;
        this.imageService.search(this.query, 0);
      });
  }

  search(text: string): void {
    this.queryChanged.next(text);
  }

}
