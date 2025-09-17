'use client';

import { PinGlobalForm } from '@/components/forms/RequestForms';

export const Booking = () => {
  return (
    <section id="book-billboard" className="py-24 bg-gradient-subtle">
      <div className="regular-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Your Billboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to get your message seen? Submit your booking request and our team will contact
              you shortly.
            </p>
          </div>

          <PinGlobalForm slug="billboard_booking" />
        </div>
      </div>
    </section>
  );
};
