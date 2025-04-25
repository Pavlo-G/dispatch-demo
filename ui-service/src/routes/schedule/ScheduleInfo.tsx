import { Box, Typography, Divider, Grid } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import type { Dispatch } from "src/types/Dispatch";
import { joinOptionalStrings } from "src/utils/joinOptionalStrings";

const ScheduleInfo = ({ dispatches }: { dispatches: Dispatch[] }) => {
  if (!dispatches || dispatches.length === 0) {
    return null;
  }
  const upcomingJob = [...dispatches].sort(
    (a, b) =>
      new Date(a.appointmentDateTime).getTime() -
      new Date(b.appointmentDateTime).getTime(),
  )[0];
  const customerName = joinOptionalStrings([
    upcomingJob.job?.customer?.firstName,
    upcomingJob.job?.customer?.lastName,
  ]);
  const address = joinOptionalStrings([
    upcomingJob.job?.address?.streetNumber,
    upcomingJob.job?.address?.streetName,
  ]);

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: (theme) => (theme.vars || theme).palette.divider,
        borderRadius: 1,
      }}
    >
      <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
        Upcoming Job
      </Typography>
      <Divider sx={{ mb: 2, width: "calc(100% + 32px)", ml: "-16px" }} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
          <CalendarTodayIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Date
          </Typography>
          <Typography variant="body2">
            {new Date(upcomingJob.appointmentDateTime).toLocaleDateString()}
          </Typography>
        </Grid>
        <Divider sx={{ my: 0.5, width: "calc(100% + 32px)", ml: "-16px" }} />
        <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Time
          </Typography>
          <Typography variant="body2">
            {new Date(upcomingJob.appointmentDateTime).toLocaleTimeString()}
          </Typography>
        </Grid>
        <Divider sx={{ my: 0.5, width: "calc(100% + 32px)", ml: "-16px" }} />
        <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Customer
          </Typography>
          <Typography variant="body2">{customerName}</Typography>
        </Grid>
        <Divider sx={{ my: 0.5, width: "calc(100% + 32px)", ml: "-16px" }} />
        <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Phone
          </Typography>
          <Typography variant="body2">
            {upcomingJob.job?.customer?.phoneNumbers?.[0]}
          </Typography>
        </Grid>
        <Divider sx={{ my: 0.5, width: "calc(100% + 32px)", ml: "-16px" }} />
        <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Address
          </Typography>
          <Typography variant="body2">{address}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleInfo;
