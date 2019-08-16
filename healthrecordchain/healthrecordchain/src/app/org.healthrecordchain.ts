import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.healthrecordchain{
   export class MedicalRecord extends Asset {
      assetId: string;
      owner: Patient;
      author: Doctor;
      data: string;
   }
   export abstract class AbstractParticipant extends Participant {
      email: string;
      firstName: string;
      lastName: string;
      address: string;
      phoneNumber: number;
      dob: string;
   }
   export class Doctor extends AbstractParticipant {
      docType: string;
      qualifications: string[];
      authorizedPatients: string[];
      workingDays: string;
      timings: string;
   }
   export class Patient extends AbstractParticipant {
      patientType: PatientType;
      authorizedDoctors: string[];
      bloodGroup: BloodGroup;
   }
   export enum PatientType {
      Student,
      Faculty,
   }
   export enum BloodGroup {
      A_pos,
      A_neg,
      B_pos,
      B_neg,
      O_pos,
      O_neg,
      AB_pos,
      AB_neg,
   }
   export class grantAccess extends Transaction {
      patient: Patient;
      doctor: Doctor;
   }
   export class revokeAccess extends Transaction {
      patient: Patient;
      doctor: Doctor;
   }
   export class writeRecord extends Transaction {
      doctor: Doctor;
      patient: Patient;
      data: string;
   }
// }
