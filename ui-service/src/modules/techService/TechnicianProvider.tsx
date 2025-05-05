import { createContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { MOCK_ENABLED } from "src/config";
import { useGetTechniciansQuery } from "src/modules/techService/techniciansApiSlice";
import { getTechnicianResponse } from "src/modules/techService/mocks";
import type { Technician } from "src/types/Technician";

export type TechContextType = {
  currentTech?: Technician;
  setCurrentTech?: Dispatch<SetStateAction<Technician | undefined>>;
};

export const TechnicianContext = createContext<TechContextType>({});

export const TechnicianProvider = ({ children }: { children?: ReactNode }) => {
  const { data: techs, isLoading } = useGetTechniciansQuery();
  const [currentTech, setCurrentTech] = useState<Technician>();

  useEffect(() => {
    if (MOCK_ENABLED) {
      setCurrentTech(getTechnicianResponse);
      return;
    }
    if (!isLoading && !!techs?.length) {
      setCurrentTech(techs[0]);
    }
  }, [techs, isLoading]);

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
