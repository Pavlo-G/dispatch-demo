import { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ScheduleDataGrid from "src/routes/schedule/ScheduleDataGrid";
import { useGetDispatchesQuery } from "src/modules/dispatchService/dispatchesApiSlice";
import { getDispatchesResponse } from "src/modules/dispatchService/mocks";
import { formatTechName } from "src/routes/schedule/utils/formatTechName";
import { TechContext } from "src/App";

const Schedule = () => {
  const { data, isError } = useGetDispatchesQuery();
  const { currentTech } = useContext(TechContext);
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
            <Grid size={{ xs: 12, lg: 9 }}>
              <ScheduleDataGrid
                dispatches={isError ? getDispatchesResponse : (data ?? [])}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Schedule;
