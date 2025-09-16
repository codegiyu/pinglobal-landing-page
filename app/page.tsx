import { MainLayout } from '@/components/layout/MainLayout';
import { About } from '@/components/sections/home/About';
import { BillboardsLocations } from '@/components/sections/home/BillboardLocations';
import { Booking } from '@/components/sections/home/Booking';
import { Contact } from '@/components/sections/home/Contact';
import { Hero } from '@/components/sections/home/Hero';

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <BillboardsLocations />
      <Booking />
      <Contact />
    </MainLayout>
  );
}
