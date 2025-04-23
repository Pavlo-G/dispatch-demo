import type { Job } from "src/types/Job";
import type { Technician } from "src/types/Technician";

export type DispatchedJob = Job & {
  technicianId: string;
  dispatchId: string;
};

export type Dispatch = {
  id: string;
  appointmentDateTime: string;
  job: DispatchedJob;
  technician: Technician;
};
