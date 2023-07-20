// server configuration constants

const jwtSecret = "Project Healer";

const body = {
  status: "Under Approval",
  firstName: "Utsav",
  lastName: "Seth",
  email: "oyeboonda@gmail.com",
  doctor: {
    id: "5d1ede64bcf7541b04ce85ba",
    firstName: "Kriti",
    lastName: "Sharma",
    specialization: [
      "Family Medicine",
      "Emergency Medicine",
      "Physical Medicine",
      "Pulmonary Medicine",
      "Internal Medicine"
    ]
  },
  patient: {
    id: "5d022a66c8cd985788b91fff",
    firstName: "Pranay",
    lastName: "Sharma",
    description:
      "Pranay is experiencing symptoms of persistent and worsening headache over the last four weeks, which have led him to from work and rely more on his mother for support and care. Pranay has also experienced symptoms of increased intracranial pressure, such as nausea, vomiting, and mild photophobia."
  }
};

module.exports = {
  jwtSecret
};
