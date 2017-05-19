///<reference path="../../../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {environment} from '../../../environments/environment';

@Injectable()
export class ImagesService {

  private url = 'https://api.unsplash.com';  // URL to web API
  private applicationId = environment.applicationId;
  searchEvent: EventEmitter<any> = new EventEmitter();
  page = 1;
  per_page = 20;
  cache = {};

  constructor(private http: Http) {
  }


  /**
   * Get random array of images.
   * @returns {Observable<R|T>}
   */
  random(page: number): Observable<any[]> {
    return this.http.get(this.url + '/photos?client_id=' + this.applicationId + '&page=' + page + '&per_page=' + this.per_page)
      .map(response => response.json())
      .catch(this.handleError);
  }


  /**
   * Handle generic error and for Rate Limit Exceeded error, share a user friendly message.
   * @param res
   * @returns {any|Array}
   */
  handleError(error: Response | any) {
    let errorMessage: string;
    if (error.status === 403 && error._body === 'Rate Limit Exceeded') {
      errorMessage = 'Oops! We have exceed our hourly free limit. Please try later.';
    } else {
      errorMessage = 'Oops! Something went wrong. Please try again.';
    }
    return Observable.throw(errorMessage);
  }


  /**
   * Search for image based on user's query, trigger an event to update view.
   * Here search query is coming from SearchComponent.
   * Search result matching query will be sent to HomeComponent.
   * @param query
   */
  search(query: string, page: number) {
    if (query.length === 0) {
      this.searchEvent.emit('clear');
      return;
    }

    this.searchEvent.emit({loading: true, page : page, query : query});
    let url = `${this.url}/search/photos?client_id=${this.applicationId}`;
    url += `&page=${page}&per_page=${this.per_page}&query=${query}`;

    this.http.get(url)
      .map(response => response.json())
      .subscribe(images => {
        this.searchEvent.emit(images);
      }, this.handleError);
  }


  /**
   * Return a listener to Search Event.
   * @returns {EventEmitter<any>}
   */
  getSearchEvent() {
    return this.searchEvent;
  }


  /**
   * Get Image by id
   * @param id
   * @returns {Observable<R|T>}
   */
  get(id: string): Observable<any[]> {
    return this.http.get(this.url + '/photos/' + id + '/?client_id=' + this.applicationId)
      .map(response => response.json())
      .catch(this.handleError);
  }

}
