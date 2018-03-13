import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import { Subject } from 'rxjs/Subject';

import { merge } from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  terms$ = new Subject<string>();

  constructor(private contactsService: ContactsService) {}

  ngOnInit () {
    this.contacts$ = this.contactsService
      .search(this.terms$)
      .pipe(merge(this.contactsService.getContacts()));
  }

  trackByContactId(index, contact) {
    return contact.id;
  }

}
