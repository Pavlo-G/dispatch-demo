import type { GridRowsProp } from "@mui/x-data-grid";
import type { Technician } from "src/types/Technician";

export const transformTechsToRows = (Techs: Technician[]): GridRowsProp => {
  return Techs.map((Tech, index) => ({
    id: index + 1,
    TechId: Tech.id,
    firstName: Tech.firstName,
    lastName: Tech.lastName,
    phoneNumber: Tech.phoneNumber,
    skills: Tech.skills?.join(", "),
  }));
};
