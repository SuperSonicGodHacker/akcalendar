export interface StaffMember {
  name: string
  email: string
  role: string
  department: string
}

export const staffDirectory: StaffMember[] = [
  // Counselors
  {
    name: "Kyle Wegner",
    email: "kyled.wegner@cms.k12.nc.us",
    role: "Counselor (A-Can)",
    department: "Counseling",
  },
  {
    name: "Lori DiPierno",
    email: "lori.dipierno@cms.k12.nc.us",
    role: "Counselor (Cap-For)",
    department: "Counseling",
  },
  {
    name: "Mary Sartwell",
    email: "maryc.sartwell@cms.k12.nc.us",
    role: "Counselor (Fos-I)",
    department: "Counseling",
  },
  {
    name: "Chasity Brooks",
    email: "chasityc.brooks@cms.k12.nc.us",
    role: "Counselor (J-Lop)",
    department: "Counseling",
  },
  {
    name: "Elizabeth Lee",
    email: "elizabeth1.lee@cms.k12.nc.us",
    role: "Counselor (Lor-O)",
    department: "Counseling",
  },
  {
    name: "Heather Schiffman",
    email: "heathers.schiffman@cms.k12.nc.us",
    role: "Counselor (P-San)",
    department: "Counseling",
  },
  {
    name: "Maria McCourt",
    email: "mariae.mccourt@cms.k12.nc.us",
    role: "Counselor (Sap-Ver)",
    department: "Counseling",
  },
  {
    name: "Kristilyn Ramos",
    email: "kristilynw.ramos@cms.k12.nc.us",
    role: "Counselor (Ves-Z)",
    department: "Counseling",
  },
  {
    name: "Jon Rochester",
    email: "jon1.rochester@cms.k12.nc.us",
    role: "Social Worker",
    department: "Counseling",
  },

  // Staff (from Updated Staff Contacts PDF)
  {
    name: "Virginia Benken",
    email: "virginiap.benken@cms.k12.nc.us",
    role: "Administrative Assistant I",
    department: "Administration",
  },
  {
    name: "Sherril Bradey",
    email: "sherril1.bradey@cms.k12.nc.us",
    role: "Technology Facilitator",
    department: "Technology",
  },
  {
    name: "Maribeth Brown",
    email: "maribethm.brown@cms.k12.nc.us",
    role: "Media Coordinator",
    department: "Media",
  },

  // Math Teachers
  {
    name: "Brook Bailey",
    email: "brook.bailey@cms.k12.nc.us",
    role: "Teacher",
    department: "Math",
  },
  {
    name: "Vidhya Bangalore",
    email: "vidhyas.bangalore@cms.k12.nc.us",
    role: "Teacher",
    department: "Math",
  },
  {
    name: "Stephen Cook",
    email: "stephen.cook@cms.k12.nc.us",
    role: "Teacher",
    department: "Math",
  },

  // English Teachers
  {
    name: "Katherine Baker",
    email: "katherinej.baker@cms.k12.nc.us",
    role: "Teacher",
    department: "English",
  },
  {
    name: "Yinessa Bueno",
    email: "yinessa1.bueno@cms.k12.nc.us",
    role: "Teacher",
    department: "English",
  },
  {
    name: "Matthew Campolmi",
    email: "matthew1.campolmi@cms.k12.nc.us",
    role: "Teacher",
    department: "English",
  },
  {
    name: "Juliann Colombo",
    email: "juliann1.colombo@cms.k12.nc.us",
    role: "Teacher",
    department: "English",
  },

  // Choral Music
  {
    name: "Brantley Barnhill",
    email: "brantleyt.barnhill@cms.k12.nc.us",
    role: "Teacher",
    department: "Choral Music",
  },

  // Social Studies Teachers
  {
    name: "Christopher Bidell",
    email: "christopherf.bidell@cms.k12.nc.us",
    role: "Teacher",
    department: "Social Studies",
  },
  {
    name: "Whesley Carey",
    email: "whesleym.carey@cms.k12.nc.us",
    role: "Teacher",
    department: "Social Studies",
  },

  // Biology Teachers
  {
    name: "Jeffrey Bronstad",
    email: "jeffreyp.bronstad@cms.k12.nc.us",
    role: "Teacher",
    department: "Biology",
  },

  // Health Occupations
  {
    name: "Susan Busbee",
    email: "susans.busbee@cms.k12.nc.us",
    role: "Teacher",
    department: "Health Occupations",
  },

  // Theater Arts
  {
    name: "Ashli Calvert",
    email: "ashlis.calvert@cms.k12.nc.us",
    role: "Teacher",
    department: "Theater Arts",
  },

  // Business Education
  {
    name: "Leah Campbell",
    email: "leah1.campbell@cms.k12.nc.us",
    role: "Teacher",
    department: "Business Education",
  },
  {
    name: "Jennifer Comer",
    email: "jenniferm.comer@cms.k12.nc.us",
    role: "Teacher",
    department: "Business Education",
  },

  // Physical Education
  {
    name: "Michael Craft",
    email: "michael.craft@cms.k12.nc.us",
    role: "Teacher",
    department: "Physical Education",
  },

  // Spanish
  {
    name: "Anays Cruz",
    email: "anaysr.cruz@cms.k12.nc.us",
    role: "Teacher",
    department: "Spanish",
  },

  // Marketing Education
  {
    name: "Jenell Davis",
    email: "jenells.davis@cms.k12.nc.us",
    role: "Teacher",
    department: "Marketing Education",
  },

  // Architecture
  {
    name: "Lloyd Davis",
    email: "lloydr.davis@cms.k12.nc.us",
    role: "Teacher",
    department: "Architecture",
  },
]

export function isValidStaffEmail(email: string): boolean {
  return staffDirectory.some((staff) => staff.email.toLowerCase() === email.toLowerCase())
}

export function getStaffMemberByEmail(email: string): StaffMember | undefined {
  return staffDirectory.find((staff) => staff.email.toLowerCase() === email.toLowerCase())
}

export function getStaffByDepartment(department: string): StaffMember[] {
  return staffDirectory.filter((staff) => staff.department === department)
}

export function getAllDepartments(): string[] {
  return [...new Set(staffDirectory.map((staff) => staff.department))]
}

export function getAllStaffMembers(): StaffMember[] {
  return staffDirectory
}
