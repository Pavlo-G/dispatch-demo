import type { Address } from "src/types/Address";

export type Customer = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  phoneNumbers: string[];
  address: Address;
};
