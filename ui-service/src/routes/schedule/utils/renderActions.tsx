import ScheduleActionsMenu from "src/routes/schedule/ScheduleActionsMenu";
import type { ScheduleActionsMenuProps } from "src/routes/schedule/ScheduleActionsMenu";

export const renderActions = (params: ScheduleActionsMenuProps) => {
  return <ScheduleActionsMenu {...params} />;
};
