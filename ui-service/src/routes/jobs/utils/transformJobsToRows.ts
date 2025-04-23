import type { GridRowsProp } from "@mui/x-data-grid";
import type { Job } from "src/types/Job";
import { joinOptionalStrings } from "src/utils/joinOptionalStrings";

export const transformJobsToRows = (jobs: Job[]): GridRowsProp => {
  return jobs.map((job, index) => ({
    id: index + 1,
    jobId: job.id,
    status: job.state,
    address: joinOptionalStrings([
      job.address?.streetNumber,
      job.address?.streetName,
      job.address?.city,
      job.address?.province,
      job.address?.postalCode,
    ]),
    customerName: joinOptionalStrings([
      job.customer?.firstName,
      job.customer?.lastName,
    ]),
    phoneNumber: job.customer?.phoneNumbers?.[0],
    techId: job.technicianId,
  }));
};
