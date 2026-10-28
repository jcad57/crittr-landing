import Hero from "../components/Hero";
import Features from "../components/Features";
import DailyCare from "../components/DailyCare";
import CoCare from "../components/CoCare";
import Pricing from "../components/Pricing";
import Download from "../components/Download";
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Features />
      <DailyCare />
      <CoCare />
      <Pricing />
      <Download />
    </main>
  );
}
