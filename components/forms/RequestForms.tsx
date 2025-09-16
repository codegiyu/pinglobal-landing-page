'use client';
import { bookingFormData } from '@/lib/constants/forms';
import { RequestForm, RequestFormFileProps } from './FormTemplate';
import { useMemo, useState } from 'react';

export const BookingForm = (props: RequestFormFileProps) => {
  return <RequestForm {...bookingFormData} {...props} />;
};

export const REQUEST_FORMS = {
  billboard_booking: BookingForm,
};

export const PinGlobalForm = ({ slug }: { slug: keyof typeof REQUEST_FORMS }) => {
  const [files, setFiles] = useState<File[]>([]);

  const FormComp = useMemo(() => {
    return slug ? REQUEST_FORMS[slug] : null;
  }, [slug]);

  if (!FormComp)
    return (
      <div className="bg-card px-4 500:px-6 md:px-8 py-8 rounded-xl shadow-soft shadow-primary/15 border border-border" />
    );

  return <FormComp files={files} setFiles={setFiles} />;
};
