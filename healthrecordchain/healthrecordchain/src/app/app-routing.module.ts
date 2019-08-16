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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { MedicalRecordComponent } from './MedicalRecord/MedicalRecord.component';

import { DoctorComponent } from './Doctor/Doctor.component';
import { PatientComponent } from './Patient/Patient.component';

import { grantAccessComponent } from './grantAccess/grantAccess.component';
import { revokeAccessComponent } from './revokeAccess/revokeAccess.component';
import { writeRecordComponent } from './writeRecord/writeRecord.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'MedicalRecord', component: MedicalRecordComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'grantAccess', component: grantAccessComponent },
  { path: 'revokeAccess', component: revokeAccessComponent },
  { path: 'writeRecord', component: writeRecordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
