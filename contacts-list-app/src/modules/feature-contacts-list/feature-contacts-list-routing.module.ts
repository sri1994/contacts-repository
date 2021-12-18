import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsListComponent } from './../feature-contacts-list/components/contacts-list/contacts-list.component';

const routes: Routes = [
  { path: 'contacts-list', component: ContactsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureContactsListRoutingModule { }
