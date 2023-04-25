import {Review} from "./Review";
import {Appointment} from "./Appointment";
import {Certificate} from "./Certificate";

export interface Psychologist{
  id: number,
  name: string,
  email?: string,
  estimation: number,
  description?: string,
  status?: boolean,
  password?: string,
  confirmedPassword?: string,
  certificates?: Certificate[],
  photo: File,

  reviewsCl?: Review[],
  appointmentsCl?: Appointment[]
}
