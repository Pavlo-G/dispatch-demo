import { Box, Typography, Grid } from "@mui/material";
import { useGetDispatchesQuery } from "src/modules/dispatchService/dispatchesApiSlice";
import { getDispatchesResponse } from "src/modules/dispatchService/mocks";
import { useTechnicianContext } from "src/modules/techService/useTechnicianContext";
import ScheduleDataGrid from "src/routes/schedule/ScheduleDataGrid";
import ScheduleInfo from "src/routes/schedule/ScheduleInfo";
import { formatTechName } from "src/routes/schedule/utils/formatTechName";

const Schedule = () => {
  const { currentTech } = useTechnicianContext();
  const { data, isError } = useGetDispatchesQuery();
  const dispatches = isError ? getDispatchesResponse : (data ?? []);
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {!currentTech ? (
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Select User for Schedule
        </Typography>
      ) : (
        <>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Schedule for {formatTechName(currentTech)}
          </Typography>
          <Grid container spacing={2} columns={12}>
            <Grid
              size={{ xs: 12, lg: dispatches.length === 0 ? 9 : 6 }}
              sx={{ order: { xs: 2, lg: 1 } }}
            >
              <ScheduleDataGrid dispatches={dispatches} />
            </Grid>
            <Grid size={{ xs: 12, lg: 3 }} sx={{ order: { xs: 1, lg: 2 } }}>
              <ScheduleInfo dispatches={dispatches} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Schedule;
