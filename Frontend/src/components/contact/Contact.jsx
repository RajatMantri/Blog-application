/* eslint-disable react/no-unescaped-entities */
import { Box, styled, Typography, IconButton } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url("/About_Contact.jpg");
  width: 100%;
  height: 60vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled(Box)`
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
`;

const Wrapper = styled(Box)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Text = styled(Typography)`
  color: #555;
  max-width: 800px;
  text-align: center;
`;

const Contact = () => {
  return (
    <Box>
      <Banner>
        <Overlay>
          <Typography variant="h2" color="white" gutterBottom>
            Let's Connect!
          </Typography>
          <Typography variant="h5" color="white">
            I'm always open to collaborating on interesting projects and ideas.
          </Typography>
        </Overlay>
      </Banner>

      <Wrapper>
        <Text variant="h5">
          You can reach me through the following platforms:
        </Text>

        <Box>
          <IconButton
            href="https://github.com/RajatMantri"
            target="_blank"
            color="primary"
          >
            <GitHub fontSize="large" />
          </IconButton>

          <IconButton
            href="mailto:mantrirajat8@gmail.com"
            target="_blank"
            color="primary"
          >
            <Email fontSize="large" />
          </IconButton>

          <IconButton
            href="https://www.linkedin.com/in/rajatmantri24/"
            target="_blank"
            color="primary"
          >
            <LinkedIn fontSize="large" />
          </IconButton>
        </Box>

        <Typography variant="body1" color="text.secondary">
          Feel free to drop me an email or connect with me on LinkedIn.
        </Typography>
      </Wrapper>
    </Box>
  );
};

export default Contact;
