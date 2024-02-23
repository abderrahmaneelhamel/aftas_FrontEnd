import { identityDocumentType } from "./identityDocumentType"

export interface Member {
    id?: number;
    membershipNumber: string;
    lastName: string;
    firstName: string;
    email: string;
    nationality: string;
    identityNumber: string;
    identificationDocumentType: identityDocumentType;
    membershipDate: Date;
    competitionIds: number[];
  }
  