import { createContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useGetTechniciansQuery } from "src/modules/techService/techniciansApiSlice";
import { getTechnicianResponse } from "src/modules/techService/mocks";
import type { Technician } from "src/types/Technician";

export type TechContextType = {
  currentTech?: Technician;
  setCurrentTech?: Dispatch<SetStateAction<Technician | undefined>>;
};

export const TechnicianContext = createContext<TechContextType>({});

export const TechnicianProvider = ({ children }: { children?: ReactNode }) => {
  const { data: techs, isError } = useGetTechniciansQuery();
  const [currentTech, setCurrentTech] = useState<Technician>();

  useEffect(() => {
    if (!isError && !!techs?.length) {
      setCurrentTech(techs[0]);
    } else {
      setCurrentTech(getTechnicianResponse);
    }
  }, [techs, isError]);

  const contextValue = useMemo(
    () => ({ currentTech, setCurrentTech }),
    [currentTech],
  );

  return (
    <TechnicianContext.Provider value={contextValue}>
      {children}
    </TechnicianContext.Provider>
  );
};
