import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ImageComponent} from './image/image.component';
import {PrivacyComponent} from './privacy/privacy.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'image/:id', component: ImageComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: '**', component: HomeComponent}
];

//
// @NgModule({
//   imports: [
//     RouterModule.forRoot(appRoutes)
//   ],
//   exports: [
//     RouterModule
//   ]
// })
//
// export class AppRoutingModule {
// }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
