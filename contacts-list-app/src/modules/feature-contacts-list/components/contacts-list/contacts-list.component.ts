import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ContactsService } from './../../../data-access-contacts-list/contacts.service';
import { Contact } from 'src/modules/models/contact.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  contactsDataList: Contact[] = [];
  selectedContactForEdit: Contact = null;
  isEditButtonClicked = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private contactsService: ContactsService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getContactsList();
  }

  // Gets contact list from GET API call through service.
  getContactsList() {
    this.contactsService
      .getContactsList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((contactsList: Contact[]) => {
        this.contactsDataList = contactsList;
      });
  }

  /**
   *
   * Adds contact to the existing list in local.
   * No API call made due to unavailability of API.
   * @param contact - Contact to be added.
   */
  addContact(contact: Contact) {
    if (!!contact) {
      this.contactsDataList.push(contact);
    }
  }

  /**
   * Deletes contact to the existing list in local.
   *  No API call made due to unavailability of API.
   * @param id - Id of contact to be deleted.
   */
  deleteContact(id: number) {
    if (!!id) {
      this.contactsDataList.splice(
        this.contactsDataList.indexOf(
          this.contactsDataList.filter((data) => id === data.id)[0]
        ),
        1
      );
    }
  }

  /**
   * Updates contact in the existing list in local.
   *  No API call made due to unavailability of API.
   * @param contactUpdated - Contact to be updated.
   */
  updateContact(contactUpdated: Contact) {
    if (!!contactUpdated && !!contactUpdated.id) {
      const modifiedContactIndex = this.contactsDataList.indexOf(
        this.contactsDataList.filter((data) => contactUpdated.id === data.id)[0]
      );
      this.contactsDataList[modifiedContactIndex] = contactUpdated;
    }
  }

  /**
   * Opens resuable pop up to fill the contact form on click of Edit or Add button.
   * @param modalTemplate - Html to be displayed in modal.
   * @param contact - Contact object to be sent in edit case.
   * @param isEdit - true incase of edit scenario
   */
  openModal(
    modalTemplate: TemplateRef<any>,
    contact: Contact,
    isEdit: boolean
  ) {
    this.selectedContactForEdit = contact;
    this.isEditButtonClicked = isEdit;
    this.modalRef = this.modalService.show(modalTemplate, {
      class: 'modal-dialogue-centered modal-md',
      backdrop: 'static',
      keyboard: true,
    });
  }

  /**
   * Captures data returned from Edit/Add pop up.
   * @param event - Html to be displayed in modal.
   */
  getAddedOrEditedContactData(event: { contact: Contact; isEdit: boolean }) {
    if (event) {
      event.isEdit
        ? this.updateContact(event.contact)
        : this.addContact(event.contact);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.contactsDataList = [];
    this.isEditButtonClicked = false;
    this.selectedContactForEdit = null;
    this.modalRef = null;
  }
}
