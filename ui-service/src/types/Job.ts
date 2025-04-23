import type { Address } from "src/types/Address";
import type { Customer } from "src/types/Customer";

export type Job = {
  id: string;
  state: string;
  address: Address;
  customer: Customer;
  technicianId?: string;
  dispatchId?: string;
};
