import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { ReactNode } from "react";

export type listItem = {
  text: string;
  icon: ReactNode;
  route?: string;
  onClick?: () => void;
};

export type listItemProps = {
  item: listItem;
  index: number;
  navigate: (route: string) => void | Promise<void>;
};

const isActive = (route?: string) => {
  return !!(window.location.pathname === route);
};

export default function ListItemLink({ item, index, navigate }: listItemProps) {
  return (
    <ListItem key={index} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        selected={isActive(item.route)}
        onClick={() => {
          if (item.route) {
            void navigate(item.route);
          }
          if (item.onClick) {
            item.onClick();
          }
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
};