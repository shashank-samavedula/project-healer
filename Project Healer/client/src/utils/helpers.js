export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const link = diseaseName => {
  let name = diseaseName.toLowerCase();

  if (name.indexOf("(") !== -1) {
    const start =
      name.indexOf(" (") !== -1 ? name.indexOf(" (") : name.indexOf("(");
    const end = name.indexOf(")");
    name = name.slice(0, start) + name.slice(end + 1);
  }

  name = name.replace(/'/g, "");
  name = name.replace(/\//g, " ");
  name = name.replace(/ {1,}/g, " ");
  name = name.replace(/\s/g, "-");

  return name;
};

export const symptomsAndCausesLink = diseaseName => {
  return link(diseaseName) + "/symptoms-and-causes";
};

export const diagnosisAndTreatmentLink = diseaseName => {
  return link(diseaseName) + "/diagnosis-and-treatment";
};
