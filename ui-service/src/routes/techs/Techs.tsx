import { Box, Typography, Grid } from "@mui/material";
import { MOCK_ENABLED } from "src/config";
import { useGetTechniciansQuery } from "src/modules/techService/techniciansApiSlice";
import { getTechniciansResponse } from "src/modules/techService/mocks";
import TechsDataGrid from "src/routes/techs/TechsDataGrid";

const Techs = () => {
  const { data } = useGetTechniciansQuery();
  const techs = MOCK_ENABLED ? getTechniciansResponse : (data ?? []);
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Techs
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <TechsDataGrid techs={techs} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Techs;
