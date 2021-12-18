import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.model';

describe('ContactsService', () => {
   
  let httpTestingController: HttpTestingController;
  let contactsService: ContactsService;
  const apiUrl = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      ContactsService
    ]
  })

  httpTestingController = TestBed.get(HttpTestingController);
  contactsService= TestBed.get(ContactsService);
});


  it('Contacts service should be created', () => {
    expect(contactsService).toBeTruthy();
  });

  it('getContactsList method should return contactsList observable',()=> {
    contactsService.getContactsList().subscribe(response => {
      expect(response).toBeTruthy();
    })
    const request = httpTestingController.expectOne(req => req.url === apiUrl);
    expect(request.cancelled).toBeFalsy();
    expect(request.request.method).toEqual('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush({});
  });
});
