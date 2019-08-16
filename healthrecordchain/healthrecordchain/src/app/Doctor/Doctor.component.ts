/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DoctorService } from './Doctor.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-doctor',
  templateUrl: './Doctor.component.html',
  styleUrls: ['./Doctor.component.css'],
  providers: [DoctorService]
})
export class DoctorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  docType = new FormControl('', Validators.required);
  qualifications = new FormControl('', Validators.required);
  authorizedPatients = new FormControl('', Validators.required);
  workingDays = new FormControl('', Validators.required);
  timings = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  phoneNumber = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);


  constructor(public serviceDoctor: DoctorService, fb: FormBuilder) {
    this.myForm = fb.group({
      docType: this.docType,
      qualifications: this.qualifications,
      authorizedPatients: this.authorizedPatients,
      workingDays: this.workingDays,
      timings: this.timings,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phoneNumber: this.phoneNumber,
      dob: this.dob
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDoctor.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.healthrecordchain.Doctor',
      'docType': this.docType.value,
      'qualifications': this.qualifications.value,
      'authorizedPatients': this.authorizedPatients.value,
      'workingDays': this.workingDays.value,
      'timings': this.timings.value,
      'email': this.email.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'address': this.address.value,
      'phoneNumber': this.phoneNumber.value,
      'dob': this.dob.value
    };

    this.myForm.setValue({
      'docType': null,
      'qualifications': null,
      'authorizedPatients': null,
      'workingDays': null,
      'timings': null,
      'email': null,
      'firstName': null,
      'lastName': null,
      'address': null,
      'phoneNumber': null,
      'dob': null
    });

    return this.serviceDoctor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'docType': null,
        'qualifications': null,
        'authorizedPatients': null,
        'workingDays': null,
        'timings': null,
        'email': null,
        'firstName': null,
        'lastName': null,
        'address': null,
        'phoneNumber': null,
        'dob': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.healthrecordchain.Doctor',
      'docType': this.docType.value,
      'qualifications': this.qualifications.value,
      'authorizedPatients': this.authorizedPatients.value,
      'workingDays': this.workingDays.value,
      'timings': this.timings.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'address': this.address.value,
      'phoneNumber': this.phoneNumber.value,
      'dob': this.dob.value
    };

    return this.serviceDoctor.updateParticipant(form.get('email').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceDoctor.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceDoctor.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'docType': null,
        'qualifications': null,
        'authorizedPatients': null,
        'workingDays': null,
        'timings': null,
        'email': null,
        'firstName': null,
        'lastName': null,
        'address': null,
        'phoneNumber': null,
        'dob': null
      };

      if (result.docType) {
        formObject.docType = result.docType;
      } else {
        formObject.docType = null;
      }

      if (result.qualifications) {
        formObject.qualifications = result.qualifications;
      } else {
        formObject.qualifications = null;
      }

      if (result.authorizedPatients) {
        formObject.authorizedPatients = result.authorizedPatients;
      } else {
        formObject.authorizedPatients = null;
      }

      if (result.workingDays) {
        formObject.workingDays = result.workingDays;
      } else {
        formObject.workingDays = null;
      }

      if (result.timings) {
        formObject.timings = result.timings;
      } else {
        formObject.timings = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.phoneNumber) {
        formObject.phoneNumber = result.phoneNumber;
      } else {
        formObject.phoneNumber = null;
      }

      if (result.dob) {
        formObject.dob = result.dob;
      } else {
        formObject.dob = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'docType': null,
      'qualifications': null,
      'authorizedPatients': null,
      'workingDays': null,
      'timings': null,
      'email': null,
      'firstName': null,
      'lastName': null,
      'address': null,
      'phoneNumber': null,
      'dob': null
    });
  }
}
