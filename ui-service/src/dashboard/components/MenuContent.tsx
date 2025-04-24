import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useNavigate } from "react-router";
import type { listItem } from "src/dashboard/components/ListItemLink";
import ListItemLink from "src/dashboard/components/ListItemLink";

type MenuContentProps = {
  openUserSwitcher: (open: boolean) => void;
};

export default function MenuCotent({ openUserSwitcher }: MenuContentProps) {
  const mainListItems: listItem[] = [
    { text: "Jobs", icon: <AssignmentRoundedIcon />, route: "/jobs" },
    { text: "Techs", icon: <PeopleRoundedIcon />, route: "/techs" },
  ];

  const secondaryListItems: listItem[] = [
    {
      text: "Change User",
      icon: <SettingsRoundedIcon />,
      onClick: () => {
        openUserSwitcher(true);
      },
    },
    { text: "Profile", icon: <SettingsRoundedIcon />, route: "/profile" },
  ];

  const navigate = useNavigate();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItemLink
            key={index}
            item={item}
            index={index}
            navigate={navigate}
          />
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItemLink
            key={index}
            item={item}
            index={index}
            navigate={navigate}
          />
        ))}
      </List>
    </Stack>
  );
}
