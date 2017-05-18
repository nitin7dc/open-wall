import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {ImageComponent} from './image/image.component';
import {AboutComponent} from './about/about.component';
// import { HeaderComponent } from './shared/layout/header/header.component';

import {
  ImagesService,
  ClickOutsideDirective,
  HeaderComponent
} from './shared';

import {PrivacyComponent} from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ImageComponent,
    AboutComponent,
    HeaderComponent,
    ClickOutsideDirective,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    routing
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
