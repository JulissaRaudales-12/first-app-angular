//import components and routes

import {Routes} from '@angular/router';
import {Home} from './home/home';   
import {Details} from './details/details';
import { AddLocation } from './add-location/add-location';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Home details',
  },
  {
    path: 'add',
    component: AddLocation,
    title: 'Add new location',
  }
];

export default routeConfig;