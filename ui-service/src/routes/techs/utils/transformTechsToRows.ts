import type { GridRowsProp } from "@mui/x-data-grid";
import type { Technician } from "src/types/Technician";


export const transformTechsToRows = (techs: Technician[]): GridRowsProp => {
  return techs.map((tech, index) => ({
    id: index + 1,
    techId: tech.id,
    firstName: tech.firstName,
    lastName: tech.lastName,
    phoneNumber: tech.phoneNumber,
    skills: tech.skills?.join(", "),
    actions: {
      techId: tech.id
    },
  }));
};
