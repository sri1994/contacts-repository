import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureContactsListRoutingModule } from './feature-contacts-list-routing.module';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

import { DataAccessContactsListModule } from './../data-access-contacts-list/data-access-contacts-list.module';
import { ContactFormModalComponent } from './components/contact-form-modal/contact-form-modal.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [ContactsListComponent, ContactFormModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FeatureContactsListRoutingModule,
    DataAccessContactsListModule,
    ModalModule.forRoot(),
  ],
  providers: [BsModalService],
  entryComponents: [ContactFormModalComponent],
})
export class FeatureContactsListModule {}
