import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Feature } from './feature/feature';
import { Product} from './product/product';
import { Contact } from './contact/contact'; 
import { Pagenotfound } from './pagenotfound/pagenotfound'
import { EmployeeDirectory } from './employee-directory/employee-directory';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'feature', component: Feature },
    { path: 'product', component: Product },
    { path: 'contact', component: Contact },
    { path: 'employees', component: EmployeeDirectory },
    { path: '**', component: Pagenotfound }
];