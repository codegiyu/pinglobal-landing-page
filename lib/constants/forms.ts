import { RequestFormProps, StringOrStringArraySchema } from '@/components/forms/FormTemplate';
import { z } from 'zod';
import { default as pick } from 'lodash/pick';
import { AVAILABLE_BILLBOARD_FACES } from './texts';
import { SelectOption } from '../types/general';
// import { generateOptionsFromArray } from '../utils/general';

const ALL_FIELDS_SCHEMA: Record<string, StringOrStringArraySchema> = {
  fullName: z.string().min(3, { error: 'Please enter at least 3 characters' }),
  firstName: z.string({ error: 'Please enter your first name' }),
  lastName: z.string({ error: 'Please enter your last name' }),
  brandName: z.string({ error: 'Please enter your brand name' }),
  contactPerson: z.string({ error: 'Please enter your name' }),
  company: z.string({ error: 'Please enter your company name' }),
  email: z.email({ error: 'Please enter a valid email' }),
  phoneNumber: z
    .string()
    .min(11, { error: 'Please enter at least 11 characters' })
    .max(14, { error: 'Phone number is too long' }),
  billboardLocation: z.string({ error: 'Please enter a value' }),
  startDate: z.string({ error: 'Please enter a value' }),
  endDate: z.string({ error: 'Please enter a value' }),
  message: z.string().min(10, { error: 'Message is not long enough' }),
  additionalNotes: z.string(),
};

export const ALL_FIELDS_DEFAULT: Record<string, string | string[]> = {
  fullName: '',
  firstName: '',
  lastName: '',
  brandName: '',
  contactPerson: '',
  company: '',
  email: '',
  phoneNumber: '',
  billboardLocation: '',
  startDate: '',
  endDate: '',
  message: '',
  additionalNotes: '',
};

export const bookingFormSchema = z.object({
  fullName: ALL_FIELDS_SCHEMA.fullName,
  brandName: ALL_FIELDS_SCHEMA.brandName,
  email: ALL_FIELDS_SCHEMA.email,
  phoneNumber: ALL_FIELDS_SCHEMA.phoneNumber,
  billboardLocation: ALL_FIELDS_SCHEMA.billboardLocation,
  startDate: ALL_FIELDS_SCHEMA.startDate,
  endDate: ALL_FIELDS_SCHEMA.endDate,
  additionalNotes: ALL_FIELDS_SCHEMA.additionalNotes,
});

export const bookingFormData: RequestFormProps<typeof bookingFormSchema> = {
  formId: 'booking-form',
  formName: 'Billboard Booking',
  formTitle: 'Billboard Booking Request',
  btnText: 'Request Booking',
  formSchema: bookingFormSchema,
  defaultFormValues: pick(ALL_FIELDS_DEFAULT, [
    'fullName',
    'brandName',
    'email',
    'phoneNumber',
    'billboardLocation',
    'startDate',
    'endDate',
    'additionalNotes',
  ]),
  inputChangeWatch: {
    startDate: updatedFormValues => {
      // asserted to HTMLInputElement here for simplicity
      const endDateInput = document.querySelector('input[name=endDate]') as HTMLInputElement;

      // Checking if the focus method exists to decide if that element really exists
      if (!endDateInput?.focus) return updatedFormValues;

      const startDate = String(updatedFormValues.startDate);

      if (!startDate) {
        endDateInput.min = new Date().toISOString().split('T')[0];
      }

      if (new Date(endDateInput.value) < new Date(startDate)) {
        endDateInput.min = startDate;
        updatedFormValues['endDate'] = startDate;
      }

      return updatedFormValues;
    },
  },
  inputsArr: [
    [
      {
        name: 'fullName',
        kind: 'input',
        inputProps: {
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
        },
      },
      {
        name: 'brandName',
        kind: 'input',
        inputProps: {
          label: 'Brand Name',
          placeholder: 'Enter brand name',
          required: false,
        },
      },
    ],
    [
      {
        name: 'email',
        kind: 'input',
        inputProps: {
          label: 'Email Address',
          placeholder: 'your.email@company.com',
          required: true,
        },
      },
      {
        name: 'phoneNumber',
        kind: 'input',
        inputProps: {
          type: 'tel',
          label: 'Phone Number',
          placeholder: 'eg. 08123456789',
          required: true,
        },
      },
    ],
    {
      name: 'billboardLocation',
      kind: 'select',
      selectProps: {
        label: 'Select Billboard Location',
        placeholder: 'Choose an available billboard location',
        options: AVAILABLE_BILLBOARD_FACES.map(
          face =>
            ({
              value: `${face.billboard.billboardId} ${face.faceId}`,
              text: `${face.billboard.name} - ${face.name}`,
            }) satisfies SelectOption
        ),
        required: true,
      },
    },
    [
      {
        name: 'startDate',
        kind: 'input',
        inputProps: {
          type: 'date',
          label: 'Preferred Start Date',
          min: new Date().toISOString().split('T')[0],
          required: false,
        },
      },
      {
        name: 'endDate',
        kind: 'input',
        inputProps: {
          type: 'date',
          label: 'Preferred End Date',
          min: new Date().toISOString().split('T')[0],
          required: false,
        },
      },
    ],
    {
      name: 'additionalNotes',
      kind: 'textarea',
      textareaProps: {
        label: 'Additional Notes',
        placeholder: 'Tell us about your advertising goals, budget or any special requirements',
        rows: 4,
        required: false,
      },
    },
  ],
};
