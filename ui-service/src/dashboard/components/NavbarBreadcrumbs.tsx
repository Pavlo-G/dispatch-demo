import type { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useLocation } from "react-router";

const StyledBreadcrumbs = styled(Breadcrumbs)(
  ({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
      alignItems: "center",
    },
  }),
);

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter((part) => part !== "");
  const lastPart = pathParts[pathParts.length - 1];
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dispatch Demo</Typography>
      {lastPart && (
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          {lastPart.charAt(0).toUpperCase() + lastPart.slice(1)}
        </Typography>
      )}
    </StyledBreadcrumbs>
  );
}
