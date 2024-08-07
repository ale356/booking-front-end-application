import React from 'react';
import TextQuote from './TextQuote';
import H4Title from './H4Title';

/**
 * About component renders the About Us section of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function About() {
  return (
    <div>
      <H4Title text="About Us" />
      <TextQuote text="Welcome to HealthPlus Clinic, your trusted destination for comprehensive medical services. At HealthPlus Clinic, we are committed to providing compassionate care and specialized treatments to meet all your healthcare needs. Our dedicated team of healthcare professionals ensures that you receive personalized attention and expert guidance on your wellness journey. With state-of-the-art facilities and a focus on patient satisfaction, we strive to be your partner in health and wellness. Experience the difference with HealthPlus Clinic today." />
    </div>
  );
}

export default About;
