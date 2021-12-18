import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DataAccessContactsListModule } from './../../../data-access-contacts-list/data-access-contacts-list.module';

import { ContactsListComponent } from './contacts-list.component';
import { ContactsService } from './../../../data-access-contacts-list/contacts.service';
import { of } from 'rxjs';
import { Contact } from 'src/modules/models/contact.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;
  let contactServiceSpy = jasmine.createSpyObj('contactService', [
    'getContactsList',
  ]);
  let modalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);
  contactServiceSpy.getContactsList.and.returnValue(of([]));
  modalServiceSpy.show.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsListComponent],
      imports: [CommonModule, DataAccessContactsListModule],
      providers: [
        {
          provide: ContactsService,
          useValue: contactServiceSpy,
        },
        {
          provide: BsModalService,
          useValue: modalServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    component.contactsDataList = [];
    fixture.detectChanges();
  });

  it('should create contacts-list component', () => {
    expect(component).toBeTruthy();
  });

  it('Testing initialization of App i.e., ngOnInit lifeCycle', () => {
    component.contactsDataList = [];
    const dummyContactList: Contact[] = [
      {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
    ];
    contactServiceSpy.getContactsList.and.returnValue(of(dummyContactList));
    component.ngOnInit();
    expect(component.contactsDataList.length).toEqual(1);
    expect(component.contactsDataList[0].firstName).toBe('Srinivas');
  });

  it('getContactsList should update contactsDataList array', () => {
    component.contactsDataList = [];
    const dummyContactList: Contact[] = [
      {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
    ];
    contactServiceSpy.getContactsList.and.returnValue(of(dummyContactList));
    expect(component.contactsDataList.length).toEqual(0);
    component.getContactsList();
    expect(component.contactsDataList.length).toEqual(1);
    expect(component.contactsDataList[0].firstName).toBe('Srinivas');
  });

  it('addContact method should add contact in contactsDataList array', () => {
    component.contactsDataList = [
      {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
    ];
    expect(component.contactsDataList.length).toEqual(1);
    component.addContact({
      firstName: 'Encora',
      lastName: 'Labs',
      id: 2,
      phone: '98989809999',
    });
    expect(component.contactsDataList.length).toEqual(2);
    expect(component.contactsDataList[1].firstName).toBe('Encora');
  });

  it('deleteContact method should delete contact in contactsDataList array', () => {
    component.contactsDataList = [
      {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
    ];
    expect(component.contactsDataList.length).toEqual(1);
    component.deleteContact(1);
    expect(component.contactsDataList.length).toEqual(0);
  });

  it('updateContact method should update specified contact in contactsDataList array', () => {
    component.contactsDataList = [
      {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
      {
        firstName: 'Encora',
        lastName: 'Labs',
        id: 2,
        phone: '98989809999',
      },
    ];
    expect(component.contactsDataList.length).toEqual(2);
    const param = {
      firstName: 'Rahul',
      lastName: 'H R',
      id: 2,
      phone: '9999999999',
    };
    component.updateContact(param);
    expect(component.contactsDataList.length).toEqual(2);
    expect(
      component.contactsDataList[
        component.contactsDataList.indexOf(
          component.contactsDataList.filter((data) => param.id === data.id)[0]
        )
      ].firstName
    ).toBe('Rahul');
  });

  it('openModal method should open pop up and update specific component data', () => {
    const param = {
      class: 'modal-dialogue-centered modal-md',
      backdrop: 'static',
      keyboard: true,
    };
    modalServiceSpy.show.and.returnValue('someReference');
    const contactParam = {
      firstName: 'Srinivas',
      lastName: 'Prasad',
      id: 1,
      phone: '8999999999',
    };
    component.openModal(null, contactParam, false);
    expect(modalServiceSpy.show).toHaveBeenCalled();
    expect(component.isEditButtonClicked).toBeFalse();
    expect(component.selectedContactForEdit).toBe(contactParam);
    expect(modalServiceSpy.show).toHaveBeenCalledWith(null, param);
  });

  it('getAddedOrEditedContactData method should trigger updateContact or addContact method', () => {
    const editEventParam = {
      contact: {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
      isEdit: true,
    };
    spyOn(component, 'updateContact');
    spyOn(component, 'addContact');
    component.getAddedOrEditedContactData(editEventParam);
    expect(component.updateContact).toHaveBeenCalledTimes(1);
    const addEventParam = {
      contact: {
        firstName: 'Srinivas',
        lastName: 'Prasad',
        id: 1,
        phone: '9999999999',
      },
      isEdit: false,
    };
    component.getAddedOrEditedContactData(addEventParam);
    expect(component.addContact).toHaveBeenCalledTimes(1);
  });
});
