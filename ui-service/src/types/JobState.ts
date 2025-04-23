export const JobState = {
  Open: "Open",
  InProgress: "In Progress",
  Closed: "Closed",
} as const;

export type JobState = (typeof JobState)[keyof typeof JobState];
