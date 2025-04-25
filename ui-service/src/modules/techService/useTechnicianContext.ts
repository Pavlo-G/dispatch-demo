import { useEffect, useMemo, useState } from "react";
import { useGetTechniciansQuery } from "./techniciansApiSlice";
import type { Technician } from "src/types/Technician";

export type TechContextType = {
  currentTech?: Technician;
  setCurrentTech?: React.Dispatch<React.SetStateAction<Technician | undefined>>;
};

const useTechnicianContext = () => {
  const { data: allTechsdata, isLoading } = useGetTechniciansQuery();

  const [currentTech, setCurrentTech] = useState<Technician | undefined>(
    undefined,
  );

  const contextValue = useMemo(
    () => ({ currentTech, setCurrentTech }),
    [currentTech, setCurrentTech],
  );

  useEffect(() => {
    if (!isLoading && allTechsdata && allTechsdata.length > 0) {
      setCurrentTech(allTechsdata[0]);
    }
  }, [allTechsdata, isLoading]);

  return contextValue;
};

export default useTechnicianContext;
