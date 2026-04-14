import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Analytics } from "../components/Analytics";
import { Testimonial } from "../components/Testimonial";

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Analytics />
      <Testimonial />
    </>
  );
}