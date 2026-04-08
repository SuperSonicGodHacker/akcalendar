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

  // Chemistry
  { name: "Jennifer Day", email: "jenniferw.day@cms.k12.nc.us", role: "Teacher", department: "Chemistry" },
  { name: "Jennifer Gallagher", email: "jennifer.gallagher@cms.k12.nc.us", role: "Teacher", department: "Chemistry" },
  { name: "Richard Harabin", email: "richard1.harabin@cms.k12.nc.us", role: "Teacher", department: "Chemistry" },

  // Administration
  { name: "Janice Deal", email: "janicem.deal@cms.k12.nc.us", role: "Administrative Assistant II", department: "Administration" },
  { name: "Catherine Dugan", email: "catherinee.dugan@cms.k12.nc.us", role: "Assistant Principal", department: "Administration" },
  { name: "Aj Hepworth", email: "aj1.hepworth@cms.k12.nc.us", role: "Assistant Principal", department: "Administration" },
  { name: "Deborah Hitt", email: "deborah.hitt@cms.k12.nc.us", role: "Assistant Principal", department: "Administration" },
  { name: "Kelly Holden", email: "kelly.holden@cms.k12.nc.us", role: "Assistant Principal", department: "Administration" },
  { name: "Gidget Ivey", email: "gidgetn.ivey@cms.k12.nc.us", role: "Administrative Assistant - Student Intervention", department: "Administration" },

  // School Psychologist
  { name: "Fiona Debartolo", email: "fionaj.debartolo@cms.k12.nc.us", role: "School Psychologist", department: "Counseling" },

  // Science
  { name: "LaTavia Dixon", email: "latavian.rorie@cms.k12.nc.us", role: "Teacher", department: "Science" },
  { name: "Tanja Donelson", email: "tanjaa.donelson@cms.k12.nc.us", role: "Teacher", department: "Science" },
  { name: "Stephanie Greene", email: "stephaniee.clark@cms.k12.nc.us", role: "Teacher", department: "Science" },
  { name: "Amy Ingoglia", email: "amy1.ingoglia@cms.k12.nc.us", role: "Teacher", department: "Science" },

  // Biology
  { name: "Wendy Donahue", email: "wendy1.donahue@cms.k12.nc.us", role: "Teacher", department: "Biology" },

  // Social Studies
  { name: "Ben Dowless", email: "benw.dowless@cms.k12.nc.us", role: "Teacher (9th Grade)", department: "Social Studies" },
  { name: "Jessica Elliott", email: "jessicae.elliott@cms.k12.nc.us", role: "Teacher", department: "Social Studies" },
  { name: "Carter Greene", email: "carterp.greene@cms.k12.nc.us", role: "Teacher", department: "Social Studies" },
  { name: "Laura Hartline", email: "laura1.hartline@cms.k12.nc.us", role: "Teacher", department: "Social Studies" },
  { name: "Adam Henry", email: "adamb.henry@cms.k12.nc.us", role: "Teacher", department: "Social Studies" },
  { name: "Carly Howie", email: "carlyb.howie@cms.k12.nc.us", role: "Teacher", department: "Social Studies" },
  { name: "Stacey Jarvis", email: "stacey.jarvis@cms.k12.nc.us", role: "Teacher", department: "Social Studies" },

  // History
  { name: "William Hook", email: "williamg.hook@cms.k12.nc.us", role: "Teacher", department: "History" },

  // Business Education
  { name: "Kerry Dwyer", email: "kerrya.dwyer@cms.k12.nc.us", role: "Teacher", department: "Business Education" },
  { name: "Josh Gaddis", email: "josh1.gaddis@cms.k12.nc.us", role: "Teacher", department: "Business Education" },

  // Marketing Education
  { name: "Marcus Elmore", email: "marcusj.elmore@cms.k12.nc.us", role: "Teacher", department: "Marketing Education" },
  { name: "Katherine Fisher", email: "katherineb.fisher@cms.k12.nc.us", role: "Teacher", department: "Marketing Education" },
  { name: "Brian Johnson", email: "brian1.johnson@cms.k12.nc.us", role: "Teacher", department: "Marketing Education" },

  // Health Occupations
  { name: "Teresa Elshoff", email: "teresa.elshoff@cms.k12.nc.us", role: "Teacher", department: "Health Occupations" },
  { name: "Kathryn General", email: "kathrynm.general@cms.k12.nc.us", role: "Teacher", department: "Health Occupations" },

  // Math
  { name: "Tyler Erb", email: "tyler1.erb@cms.k12.nc.us", role: "Teacher", department: "Math" },
  { name: "Matthew Greiling", email: "matthew1.greiling@cms.k12.nc.us", role: "Teacher", department: "Math" },
  { name: "Kerri Harding", email: "kerrij.harding@cms.k12.nc.us", role: "Teacher", department: "Math" },
  { name: "Benjamin Ingle", email: "benjaminr.ingle@cms.k12.nc.us", role: "Teacher", department: "Math" },

  // English
  { name: "Rachel Flock", email: "rachele.flock@cms.k12.nc.us", role: "Teacher", department: "English" },
  { name: "Brian Hacker", email: "brian1.hacker@cms.k12.nc.us", role: "Teacher", department: "English" },
  { name: "Adrianna Howard", email: "adriannak.howard@cms.k12.nc.us", role: "Teacher", department: "English" },

  // Band
  { name: "Andrew Francis", email: "andrewr.francis@cms.k12.nc.us", role: "Teacher", department: "Band" },

  // Technology Education
  { name: "John Glenn", email: "john.glenn@cms.k12.nc.us", role: "Teacher", department: "Technology Education" },
  { name: "Laverne Godfrey", email: "laverne1.godfrey-@cms.k12.nc.us", role: "Teacher", department: "Technology Education" },

  // Physical Education
  { name: "Mark Harman", email: "mark.harman@cms.k12.nc.us", role: "Teacher", department: "Physical Education" },
  { name: "Greg Jachym", email: "greg.jachym@cms.k12.nc.us", role: "Teacher", department: "Physical Education" },

  // Social Worker
  { name: "Tiffany Hutchins", email: "tiffanyc.hutchins@cms.k12.nc.us", role: "Social Worker", department: "Counseling" },
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
