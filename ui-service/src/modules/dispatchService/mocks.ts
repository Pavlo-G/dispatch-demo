export const getDispatchesResponse = [
  {
    id: "DISPATCH2952",
    appointmentDateTime: "2025-04-11T01:24:38.319Z",
    job: {
      id: "JOB5678",
      state: "In Progress",
      address: {
        streetName: "Market St",
        streetNumber: "456",
        city: "San Francisco",
        province: "CA",
        postalCode: "94105",
      },
      customer: {
        firstName: "Jane",
        lastName: "Smith",
        contactNumber: "jane.smith@example.com",
        phoneNumbers: ["098-765-4321"],
        address: {
          streetName: "Market St",
          streetNumber: "456",
          city: "San Francisco",
          province: "CA",
          postalCode: "94105",
        },
      },
      technicianId: "TECH5811",
      dispatchId: "DISPATCH2952",
    },
    technician: {
      firstName: "Bob",
      lastName: "Kim",
      id: "TECH5811",
      skills: ["Fiber", "Software"],
      phoneNumber: "444-555-6666",
    },
  },
];

export const getDispatchResponse = {
  id: "DISPATCH2952",
  appointmentDateTime: "2025-04-11T01:24:38.319Z",
  job: {
    id: "JOB5678",
    state: "In Progress",
    address: {
      streetName: "Market St",
      streetNumber: "456",
      city: "San Francisco",
      province: "CA",
      postalCode: "94105",
    },
    customer: {
      firstName: "Jane",
      lastName: "Smith",
      contactNumber: "jane.smith@example.com",
      phoneNumbers: ["098-765-4321"],
      address: {
        streetName: "Market St",
        streetNumber: "456",
        city: "San Francisco",
        province: "CA",
        postalCode: "94105",
      },
    },
    technicianId: "TECH5811",
    dispatchId: "DISPATCH2952",
  },
  technician: {
    firstName: "Bob",
    lastName: "Kim",
    id: "TECH5811",
    skills: ["Fiber", "Software"],
    phoneNumber: "444-555-6666",
  },
};

export const createDispatchPayload = {
  appointmentDateTime: "2025-04-11T01:24:38.319Z",
  job: {
    id: "JOB5678",
    state: "Open",
    address: {
      streetName: "Market St",
      streetNumber: "456",
      city: "San Francisco",
      province: "CA",
      postalCode: "94105",
    },
    customer: {
      firstName: "Jane",
      lastName: "Smith",
      contactNumber: "jane.smith@example.com",
      phoneNumbers: ["098-765-4321"],
      address: {
        streetName: "Market St",
        streetNumber: "456",
        city: "San Francisco",
        province: "CA",
        postalCode: "94105",
      },
    },
  },
  technician: {
    firstName: "Bob",
    lastName: "Kim",
    id: "TECH5811",
    skills: ["Fiber", "Software"],
    phoneNumber: "444-555-6666",
  },
};
