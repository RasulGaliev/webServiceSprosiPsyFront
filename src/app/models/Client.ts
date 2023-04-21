import {Appointment} from "./Appointment";

export interface Client{
  id?: number,
  name: string,
  login?: string,
  password?: string,
  photo?: File,
  appointmentsCl?: Appointment[]
}
