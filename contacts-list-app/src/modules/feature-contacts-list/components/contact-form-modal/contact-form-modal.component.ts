import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Contact } from 'src/modules/models/contact.model';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss'],
})
export class ContactFormModalComponent implements OnInit, OnDestroy {
  @Input() public modalRef: BsModalRef;
  @Input() public contact: Contact;
  @Input() public isEdit: boolean;
  @Input() public contactsDataList: Contact[];
  @Output() contactData: EventEmitter<{ contact: Contact; isEdit: boolean }> =
    new EventEmitter();

  title = '';
  contactForm: FormGroup;
  contactIdsList = [];
  duplicateIdErrorMsg = '';
  destroy$: Subject<any> = new Subject<any>();

  constructor(private modalService: BsModalService) {
    this.contactForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      id: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.title = this.isEdit ? 'EDIT CONTACT FORM' : 'ADD CONTACT FORM';
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
      if (this.isEdit) {
        this.contactForm.get('id').disable();
      }
      this.contactForm.updateValueAndValidity();
    }
    if (this.contactsDataList && this.contactsDataList.length) {
      this.contactIdsList = this.contactsDataList.map(
        (data: Contact) => data.id
      );
    }
  }

  validateContactId(isEdit) {
    if (
      this.contactForm.valid &&
      this.contactForm.value &&
      !this.isEdit &&
      this.contactIdsList.includes(this.contactForm.get('id').value)
    ) {
      this.duplicateIdErrorMsg =
        'Entered id already exists. Please enter new id.';
    } else {
      this.contactData.emit({
        contact: this.contactForm.getRawValue(),
        isEdit,
      });
      this.modalService.hide();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.title = '';
    this.contactForm.reset();
    this.contactIdsList = [];
    this.duplicateIdErrorMsg = '';
  }
}
