import React from "react";
import { Grid, Typography } from "@material-ui/core";

function AboutUs(props) {
  return (
    <>
      <Grid container className="about-us-grid main" justify="center">
        <Grid item>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className="about-us-grid container"
          >
            <Grid item style={{ marginBottom: "40px" }}>
              <Typography variant="h3" align="center">
                Healing humanity, One patient at a time!
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: "24px" }}>
              <Typography variant="h5" align="center">
                Your partner in personalized healthcare at your fingertips.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center" paragraph>
                When it comes to accessing comprehensive healthcare, Project
                Healer is the trusted specialist many people turn towards to
                commence healing. It is a one-stop platform that connects
                patients with everything they need to start feeling better and
                take good care of their loved ones. From diagnosing health
                concerns, to finding a suitable doctor, to booking appointments
                for diagnostic tests, obtaining prescription medications, to
                maintaining health records and even guidance on how to live
                healthier.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center" paragraph>
                Our team is committed to improving the quality, experience and
                accessibility of healthcare services. We firmly believe that a
                healthy individual has a significant impact, both in his/her
                personal circle and society. Project Healer is your partner in
                personalized healthcare at your fingertips!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center" paragraph>
                Healthcare professionals may also channel the potential of
                Project Healer. It is the ultimate stage to build your medical
                practice, form invaluable associations with other medical
                professionals and engage intensely with patients.
              </Typography>
            </Grid>
            <Grid
              container
              spacing={3}
              justify="center"
              className="about-us-grid content"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h4" align="center">
                  2558
                </Typography>
                <Typography align="center">Appointments Booked</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h4" align="center">
                  780
                </Typography>
                <Typography align="center">Doctors Signing Up</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h4" align="center">
                  646
                </Typography>
                <Typography align="center">Reviews by Patient</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h4" align="center">
                  3758
                </Typography>
                <Typography align="center">Total Visits</Typography>
              </Grid>
            </Grid>
            <Grid item style={{ margin: "32px 0px" }}>
              <Typography variant="h3" align="center">
                Making Healthcare Accessible With Technology
              </Typography>
            </Grid>
            <Grid
              container
              spacing={3}
              justify="center"
              className="about-us-grid content-2"
            >
              <Grid item sm={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  PROJECT HEALER FOR EVERYONE
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Enhancing Healthcare Access through Technology
                </Typography>
                <Typography variant="body1" paragraph>
                  Project Healer’s virtual delivery of online medical care is
                  the first step in helping patients feel better. Through our
                  state-of-the-art platform, you may ask questions for free,
                  seek one-on-one interaction with your doctor, pay fees online
                  and even access our blog for healthy living tips. Through this
                  special virtual platform, patients are put in charge of their
                  medical care.
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  PROJECT HEALER FOR DOCTORS
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Helping Doctors practice medicine effectively and
                  effortlessly!
                </Typography>
                <Typography variant="body1" paragraph>
                  Our unique platform enables doctors to develop and deliver
                  their medical expertise to patients all over the country. This
                  helps them get ranked by patients they’ve helped and also get
                  recommendations from peers; thereby increasing their
                  popularity and credibility amongst the medical and online
                  community. In addition, Project Healer’s easy-to-use
                  management software enables doctors to manage patient
                  information from multiple clinics.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AboutUs;
