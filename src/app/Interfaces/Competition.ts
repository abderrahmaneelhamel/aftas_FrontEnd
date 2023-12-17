import { Time } from "@angular/common";

export interface Competition {
  id?: number;
  code: string;
  date: Date;
  startTime: string;
  endTime: string;
  numberOfParticipants: number;
  memberIds: number[];
  location: string;
}
