export interface Emi {
  id: number;
  name: string;
  parentEmail: string;
  amount: number;
  dueDate: string; // ISO date string
}

export interface Institute {
  id: number;
  name: string;
  students: Emi[];
}

export const institutes: Institute[] = [
  {
    id: 1,
    name: "Sunrise Public School",
    students: [
      {
        id: 1,
        name: "Amit Sharma",
        parentEmail: "amit.parent@gmail.com",
        amount: 3500,
        dueDate: "2025-06-15",
      },
      {
        id: 2,
        name: "Neha Verma",
        parentEmail: "neha.parent@gmail.com",
        amount: 4200,
        dueDate: "2025-06-18",
      },
    ],
  },
  {
    id: 2,
    name: "Excel Coaching Center",
    students: [
      {
        id: 1,
        name: "Rohit Singh",
        parentEmail: "rohit.parent@gmail.com",
        amount: 2800,
        dueDate: "2025-06-14",
      },
      {
        id: 2,
        name: "Priya Patel",
        parentEmail: "priya.parent@gmail.com",
        amount: 3900,
        dueDate: "2025-06-16",
      },
    ],
  },
  // ...more data
];