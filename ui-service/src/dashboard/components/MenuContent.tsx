import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";

type listItem = {
  text: string;
  icon: ReactNode;
  route: string;
}

type listItemProps = {
  item: listItem;
  index: number;
  navigate: (route: string) => void;
}

const mainListItems: listItem[] = [
  { text: "Jobs", icon: <AssignmentRoundedIcon />, route: "/jobs" },
  { text: "Techs", icon: <PeopleRoundedIcon />, route: "/techs" },
];

const secondaryListItems: listItem[] = [
  { text: "Profile", icon: <SettingsRoundedIcon />, route: "/profile" },
];

const isActive = (route: string) => {
  return window.location.pathname === route;
};

export const ListItemLink = ({item, index, navigate}: listItemProps) => {
  return (<ListItem key={index} disablePadding sx={{ display: "block" }}>
    <ListItemButton selected={isActive(item.route)} onClick={() => { navigate(item.route); }}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItemButton>
</ListItem>)
}

export default function MenuContent() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItemLink key={index} item={item} index={index} navigate={navigate} />
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItemLink key={index} item={item} index={index} navigate={navigate} />
        ))}
      </List>
    </Stack>
  );
}
