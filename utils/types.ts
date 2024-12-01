

export interface Medication {
  id: number;
  name: string;
  dosage: number;
  startDate: string;
  endDate: string;
  username: string;
}

export const defaultMedication: Medication = {name: '', dosage: 0, startDate: String(new Date()), endDate: String(new Date()), username: '', id: -1}