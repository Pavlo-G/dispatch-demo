
import { Box, Typography, Grid } from "@mui/material";
import CustomizedDataGrid from "src/dashboard/components/CustomizedDataGrid";

export default function Jobs() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Jobs
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
    </Box>
  );
}
