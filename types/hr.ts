export const HR_REQUEST_TYPES = ["General HR Request","Employment/HR Document Request","Employee Information Update Request","Leave-related inquiry","Other HR Request"] as const;
export const LEAVE_TYPES = ["Vacation Leave","Sick Leave","Maternity Leave"] as const;
export const HR_STATUSES = ["Pending","Under Review","Approved","Rejected","Completed"] as const;
export const EMPLOYMENT_STATUSES = ["Active","On Leave","Probation","Suspended","Terminated"] as const;
export type HrStatus = typeof HR_STATUSES[number];
