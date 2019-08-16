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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Make an Offer for a commodity listing
 * @param {org.healthrecordchain.grantAccess} tx
 * @transaction
 */

async function grantAccess(tx) {
    let patient = tx.patient;
    let doctor = tx.doctor;

    patient.authorizedDoctors.push(doctor.email);
    doctor.authorizedPatients.push(patient.email);


    return getParticipantRegistry('org.healthrecordchain.Patient')
        .then(function(patientRegistry){
            return patientRegistry.update(tx.patient);
        })
        .then(function(){
            return getParticipantRegistry('org.healthrecordchain.Doctor');
        })
        .then(function(doctorRegistry){
            return doctorRegistry.update(tx.doctor);
        });

    // let patientRegistry = await getParticipantRegistry(NSP);
    // await patientRegistry.update(authorizedDoctors);

    // let doctorRegistry = await getParticipantRegistry(NSD);
    // await doctorRegistry.update(authorizedPatients);

  } 
  
/**
 * Take away the access from a user.
 * @param {org.healthrecordchain.revokeAccess} tx
 * @transaction
 */

async function revokeAccess(tx) {
    let patient = tx.patient;
    let doctor = tx.doctor;

    let arraysizep = patient.authorizedDoctors.length;
    let indexp = patient.authorizedDoctors.indexOf(doctor.email);
    let indexd = doctor.authorizedPatients.indexOf(patient.email);

    if(indexp >= 0){
        patient.authorizedDoctors.splice(indexp,1);
    }
    if(indexd >= 0){
        doctor.authorizedPatients.splice(indexd,1);
    }

    return getParticipantRegistry('org.healthrecordchain.Patient')
        .then(function(patientRegistry){
            return patientRegistry.update(tx.patient);
        })
        .then(function(){
            return getParticipantRegistry('org.healthrecordchain.Doctor');
        })
        .then(function(doctorRegistry){
            return doctorRegistry.update(tx.doctor);
        });

  }