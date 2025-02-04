export type TMembership = "flexible" | "professional" | "corporate"
export type TMemberStatus = "active" | "inactive"

export interface IMember {
  id:                 string,
  name:               string,
  contactInfo:        string,
  membershipType:     TMembership,
  startDate:          string,
  status:             TMemberStatus,
  orders:             number,
  timers:             number
}

export interface ITableMember {
  id:             string,
  name:           string,
  contactInfo:    string,
  updatedAt:      string,
  createdAt:      string
}

export interface IMemberPayload {
  name:         string,
  contactInfo:  string
}