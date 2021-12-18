import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Contact} from './../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  getContactsList(): Observable<Contact[]> {
    const contactUrl = 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';
    return this.httpClient.get(contactUrl).pipe(map((contactsList: Contact[]) => contactsList));
  }
}
