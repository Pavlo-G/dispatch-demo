import type { Technician } from "src/types/Technician";
import { joinOptionalStrings } from "src/utils/joinOptionalStrings";

export const formatTechName = (tech: Technician) => {
  const { id, firstName, lastName } = tech;
  const techName = joinOptionalStrings([firstName, lastName]);
  const techId = techName ? `(${id})` : id;
  return joinOptionalStrings([techName, techId]);
};
