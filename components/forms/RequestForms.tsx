'use client';
import { bookingFormData, bookingFormSchema } from '@/lib/constants/forms';
import { RequestForm, RequestFormFileProps } from './FormTemplate';
import { useMemo, useState } from 'react';
import { omit } from 'lodash';
import z from 'zod';

export const BookingForm = (props: RequestFormFileProps) => {
  type TSchema = typeof bookingFormSchema;
  const inputChangeWatch = (bookingFormData['inputChangeWatch'] || {}) as unknown as Partial<
    Record<keyof z.infer<TSchema>, (updatedFormValues: z.infer<TSchema>) => z.infer<TSchema>>
  >;

  return (
    <RequestForm
      {...omit(bookingFormData, ['inputChangeWatch'])}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      inputChangeWatch={inputChangeWatch}
      {...props}
    />
  );
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
