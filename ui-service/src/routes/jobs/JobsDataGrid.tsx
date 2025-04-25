import { useContext, useState } from "react";
import type { Dayjs } from "dayjs";
import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowId } from "@mui/x-data-grid";
import { TechContext } from "src/App";
import CustomDateTimePicker from "src/components/CustomerDateTimePicker";
import { useCreateDispatchMutation } from "src/modules/dispatchService/dispatchesApiSlice";
import { useUpdateJobMutation } from "src/modules/jobService/jobsApiSlice";
import { columns } from "src/routes/jobs/config";
import { transformJobsToRows } from "src/routes/jobs/utils/transformJobsToRows";
import type { Job } from "src/types/Job";
import { JobState } from "src/types/JobState";

const JobsDataGrid = ({ jobs }: { jobs: Job[] }) => {
  const [selectedRow, setSelectedRow] = useState<GridRowId>();
  const [appointmentDateTime, setAppointmentDateTime] = useState<string>();
  const { currentTech } = useContext(TechContext);
  const rows = transformJobsToRows(jobs);

  const [createDispatch] = useCreateDispatchMutation();
  const [updateJob] = useUpdateJobMutation();

  const handleDateChange = (appointmentDateTime: Dayjs | null) => {
    setAppointmentDateTime(appointmentDateTime?.toDate().toISOString());
  };

  const handleDispatchJob = async () => {
    const selectedRowData = rows.find((row) => row.id === selectedRow);
    const selectedJob = jobs.find((job) => job.id === selectedRowData?.jobId);

    if (!selectedJob || !appointmentDateTime || !currentTech) {
      console.warn("Missing required data to dispatch job.");
      return;
    }
    try {
      const dispatchResult = await createDispatch({
        appointmentDateTime,
        job: selectedJob,
        technician: currentTech,
      }).unwrap();
      console.info("Dispatch succeeded:", dispatchResult);
      try {
        const jobResult = await updateJob({
          id: selectedJob.id,
          state: JobState.InProgress,
        }).unwrap();
        console.info("Job update succeeded:", jobResult);
      } catch (jobError) {
        console.error("Job update failed:", jobError);
      }
    } catch (dispatchError) {
      console.error("Dispatch failed:", dispatchError);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: selectedRow ? "text.primary" : "text.disabled",
          }}
        >
          Appointment Date/Time
        </Typography>
        <CustomDateTimePicker
          isDisabled={!selectedRow}
          onDateChange={handleDateChange}
        />
        <Button
          variant="outlined"
          disabled={!selectedRow || !appointmentDateTime}
          onClick={handleDispatchJob}
        >
          Dispatch Job
        </Button>
      </Grid>
      <Grid size={12}>
        <DataGrid
          columns={columns}
          rows={rows}
          checkboxSelection
          disableMultipleRowSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRow(
              newSelection.length > 0 ? newSelection[0] : undefined,
            );
          }}
          isRowSelectable={(params) => params.row.status === JobState.Open}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
          slotProps={{
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: {
                  variant: "outlined",
                  size: "small",
                },
                columnInputProps: {
                  variant: "outlined",
                  size: "small",
                  sx: { mt: "auto" },
                },
                operatorInputProps: {
                  variant: "outlined",
                  size: "small",
                  sx: { mt: "auto" },
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: "outlined",
                    size: "small",
                  },
                },
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default JobsDataGrid;
