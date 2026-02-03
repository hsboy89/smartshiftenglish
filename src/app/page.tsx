import { Hero } from "@/components/sections/Hero";
import { AiFeatures } from "@/components/sections/AiFeatures";
import { SmartVocab } from "@/components/sections/SmartVocab";
import { LmsFeatures } from "@/components/sections/LmsFeatures";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <AiFeatures />
      <SmartVocab />
      <LmsFeatures />
      <Pricing />
    </main>
  );
}
