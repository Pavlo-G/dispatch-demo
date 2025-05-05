import { Box, Typography, Grid } from "@mui/material";
import { MOCK_ENABLED } from "src/config";
import { useGetJobsQuery } from "src/modules/jobService/jobsApiSlice";
import { getJobsResponse } from "src/modules/jobService/mocks";
import JobsDataGrid from "src/routes/jobs/JobsDataGrid";

const Jobs = () => {
  const { data } = useGetJobsQuery();
  const jobs = MOCK_ENABLED ? getJobsResponse : (data ?? []);
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Jobs
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <JobsDataGrid jobs={jobs} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Jobs;
