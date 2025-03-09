/* eslint-disable react/no-unescaped-entities */
import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url("/About_Contact.jpg");
  width: 100%;
  height: 60vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled(Box)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Text = styled(Typography)`
  color: #444;
  margin: 20px 0;
  line-height: 1.8;
  max-width: 800px;
`;

const IconWrapper = styled(Box)`
  display: flex;
  gap: 30px;
  margin-top: 30px;
`;

const About = () => {
  return (
    <Box>
      <Banner>
        <Typography variant="h2" fontWeight={600}>
          About This Blog
        </Typography>
      </Banner>
      <Wrapper>
        <Typography variant="h4" gutterBottom>
          Welcome to My Blog!
        </Typography>
        <Text variant="h6">
          This blog is a platform where anyone can share their thoughts,
          experiences, and insights on web development, programming, technology
          and many other things.You'll find content that caters to everyone.
        </Text>

        <Text variant="h6">
          I believe in the power of sharing knowledge and learning together. My
          goal is to create a community where we can discuss ideas, solve
          problems, and grow as developers.
        </Text>

        <Typography variant="h5" mt={4}>
          Let's Connect:
        </Typography>
        <IconWrapper>
          <Link
            href="https://github.com/RajatMantri"
            color="inherit"
            target="_blank"
            aria-label="GitHub"
          >
            <GitHub fontSize="large" />
          </Link>

          <Link
            href="mailto:mantrirajat8@gmail.com"
            color="inherit"
            target="_blank"
            aria-label="Email"
          >
            <Email fontSize="large" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/rajatmantri24/"
            color="inherit"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedIn fontSize="large" />
          </Link>
        </IconWrapper>
      </Wrapper>
    </Box>
  );
};

export default About;
