import { MainLayout } from '@/components/layout/MainLayout';
import { About } from '@/components/sections/home/About';
import { BillboardsLocations } from '@/components/sections/home/BillboardLocations';
import { BrandsMarquee } from '@/components/sections/home/BrandsMarquee';
import { Booking } from '@/components/sections/home/Booking';
import { Contact } from '@/components/sections/home/Contact';
import { Hero } from '@/components/sections/home/Hero';
import { Regulatories } from '@/components/sections/home/Regulatories';

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <BrandsMarquee />
      <BillboardsLocations />
      <Regulatories />
      <Booking />
      <Contact />
    </MainLayout>
  );
}
