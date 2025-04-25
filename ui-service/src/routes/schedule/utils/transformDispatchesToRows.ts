import type { GridRowsProp } from "@mui/x-data-grid";
import type { Dispatch } from "src/types/Dispatch";
import { joinOptionalStrings } from "src/utils/joinOptionalStrings";

export const transformDispatchesToRows = (
  dispatches: Dispatch[],
): GridRowsProp => {
  return dispatches.map((dispatch, index) => ({
    id: index + 1,
    jobId: dispatch.job.id,
    appointmentDateTime: dispatch.appointmentDateTime,
    address: joinOptionalStrings([
      dispatch.job.address?.streetNumber,
      dispatch.job.address?.streetName,
      dispatch.job.address?.city,
      dispatch.job.address?.province,
      dispatch.job.address?.postalCode,
    ]),
    actions: {
      jobId: dispatch.job.id,
      dispatchId: dispatch.id,
    },
  }));
};
