import TechsActionsMenu from "src/routes/techs/TechsActionsMenu";
import type { TechsActionsMenuProps } from "src/routes/techs/TechsActionsMenu";

export const renderActions = (params: TechsActionsMenuProps) => {
  return <TechsActionsMenu {...params} />;
};
