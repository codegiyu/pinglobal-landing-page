/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useMemo } from 'react';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularTextarea } from '@/components/atoms/RegularTextarea';
import { RegularSelect } from '@/components/atoms/RegularSelect';
import { toast } from '@/components/atoms/Toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/general/Card';
import { useForm } from '@/lib/hooks/use-form';
import { cn } from '@/lib/utils';
import { CheckCheck, Plus, X } from 'lucide-react';
import { callApi } from '@/lib/services/callApi';
import type { IPopulatedBillboardFace } from '@/lib/constants/endpoints';
import { SelectOption } from '@/lib/types/general';
import { z } from 'zod';
import { useBillboardsStore } from '@/lib/stores/useBillboardsStore';

// Define the face schema
const faceSchema = z.object({
  billboardFace: z.string().min(1, { message: 'Please select a billboard face' }),
  startDate: z.string().min(1, { message: 'Please select a start date' }),
  endDate: z.string().min(1, { message: 'Please select an end date' }),
});

// Define the booking form schema
const bookingFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Please enter at least 3 characters' }),
  brandName: z.string().optional(),
  email: z.email({ message: 'Please enter a valid email' }).optional(),
  phoneNumber: z
    .string()
    .min(11, { message: 'Please enter at least 11 characters' })
    .max(14, { message: 'Phone number is too long' }),
  faces: z.array(faceSchema).min(1, { message: 'Please add at least one billboard face' }),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof bookingFormSchema>;

const defaultFormValues: FormValues = {
  fullName: '',
  brandName: '',
  email: '',
  phoneNumber: '',
  faces: [
    {
      billboardFace: '',
      startDate: '',
      endDate: '',
    },
  ],
  note: '',
};

export const BookingForm = () => {
  const { billboards } = useBillboardsStore(state => ({
    billboards: state.billboards,
  }));

  const {
    formValues,
    formErrors,
    loading,
    isValid,
    errorsVisible,
    submitted,
    resetForm,
    handleInputChange,
    setFormValues,
    handleSubmit,
    validateForm,
  } = useForm({
    formSchema: bookingFormSchema,
    defaultFormValues,
    onSubmit,
    validateOnChange: true,
  });

  const formValid = useMemo(() => isValid, [isValid]);

  // Extract available faces from billboards data
  const availableFaces = useMemo(() => {
    const faces: IPopulatedBillboardFace[] = [];
    billboards.forEach(billboard => {
      (billboard.faces ?? []).forEach(face => {
        const isAvailable =
          !face.hasActiveBookings &&
          !face.isBooked &&
          (face.currentBookings ?? []).length === 0 &&
          face.status === 'active';

        if (isAvailable) {
          faces.push({
            ...face,
            billboard: {
              _id: billboard._id,
              name: billboard.name,
              slug: billboard.slug,
              owner: billboard.owner,
              status: billboard.status,
              type: billboard.type,
              location: billboard.location,
              images: billboard.images,
              tags: billboard.tags,
            },
          });
        }
      });
    });

    console.log({ availableFaces: faces });
    return faces;
  }, [billboards]);

  // Create a map of slug to faceId for quick lookup
  const slugToFaceIdMap = useMemo(() => {
    const map = new Map<string, string>();
    availableFaces.forEach(face => {
      map.set(face.slug, face._id);
    });
    return map;
  }, [availableFaces]);

  // Billboard location options (using slug as value)
  const locationOptions: SelectOption[] = useMemo(
    () =>
      availableFaces.map(
        face =>
          ({
            value: face.slug,
            text: `${face.billboard.name} - ${face.name}`,
          }) satisfies SelectOption
      ),
    [availableFaces]
  );

  async function onSubmit(values: FormValues): Promise<boolean> {
    try {
      // Validate that all faces have valid data
      if (!values.faces || values.faces.length === 0) {
        toast({
          title: 'Missing Information',
          description: 'Please add at least one billboard face to your request.',
          variant: 'error',
        });
        return false;
      }

      // Map each face's slug to faceId
      const processedFaces = values.faces.map(face => {
        const slug = face.billboardFace.trim();
        const faceId = slugToFaceIdMap.get(slug);

        if (!faceId) {
          throw new Error(`Invalid billboard face selection: ${slug}`);
        }

        return {
          billboardFaceId: faceId,
          startDate: face.startDate,
          endDate: face.endDate,
        };
      });

      // Prepare the payload for CREATE_BOOKING_REQUEST
      const payload = {
        billboardBookingRequestSubmit: {
          fullName: values.fullName,
          brandName: values.brandName || undefined,
          phoneNumber: values.phoneNumber,
          email: values.email || undefined,
          faces: processedFaces,
          note: values.note || undefined,
        },
      };

      const { data, error, message } = await callApi('CREATE_BOOKING_REQUEST', {
        payload,
      });

      if (error) {
        toast({
          title: message || 'Booking Request Failed',
          description: error.message || 'Please try again later.',
          variant: 'error',
        });
        return false;
      }

      if (data) {
        toast({
          title: 'Booking Request Submitted!',
          description:
            "We'll contact you within 24 hours to discuss your billboard advertising needs.",
          variant: 'success',
        });
        resetForm();
        return true;
      }

      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'error',
      });
      return false;
    }
  }

  // Add a new face to the form
  const addFace = () => {
    setFormValues(prev => ({
      ...prev,
      faces: [
        ...prev.faces,
        {
          billboardFace: '',
          startDate: '',
          endDate: '',
        },
      ],
    }));
  };

  // Remove a face from the form
  const removeFace = (index: number) => {
    if (formValues.faces.length <= 1) {
      toast({
        title: 'Cannot Remove',
        description: 'You must have at least one billboard face in your request.',
        variant: 'error',
      });
      return;
    }
    setFormValues(prev => ({
      ...prev,
      faces: prev.faces.filter((_, i) => i !== index),
    }));
  };

  // Handle face field changes
  const handleFaceChange = (
    faceIndex: number,
    field: 'billboardFace' | 'startDate' | 'endDate',
    value: string
  ) => {
    setFormValues(prev => ({
      ...prev,
      faces: prev.faces.map((face, index) =>
        index === faceIndex ? { ...face, [field]: value } : face
      ),
    }));

    // Handle startDate/endDate relationship
    if (field === 'startDate') {
      const updatedFaces = formValues.faces.map((face, index) =>
        index === faceIndex ? { ...face, startDate: value } : face
      );
      const currentFace = updatedFaces[faceIndex];

      // If endDate is before the new startDate, update it
      if (currentFace.endDate && new Date(currentFace.endDate) < new Date(value)) {
        setFormValues(prev => ({
          ...prev,
          faces: prev.faces.map((face, index) =>
            index === faceIndex ? { ...face, startDate: value, endDate: value } : face
          ),
        }));
      }
    }
  };

  const generalValidation = () => {
    return validateForm();
  };

  // Handle hash-based location selection (from BillboardLocations component)
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1); // remove '#'
        const [input, value] = hash.split(':');

        if (input === 'billboardLocation') {
          const slug = decodeURIComponent(value);
          // Verify the slug exists in available faces
          if (slugToFaceIdMap.has(slug)) {
            // Set the first face's billboardFace to the slug
            setFormValues(prev => ({
              ...prev,
              faces: prev.faces.map((face, index) =>
                index === 0 ? { ...face, billboardFace: slug } : face
              ),
            }));
          }
        }

        // Remove hash immediately
        history.replaceState(null, '', window.location.pathname);
      }
    };

    // Check hash on mount (only if faces are available)
    if (availableFaces.length > 0) {
      onHashChange();
    }

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [availableFaces.length, slugToFaceIdMap]);

  return (
    <Card className="shadow-pin-button border-pin-gray-light">
      <CardHeader className="bg-gradient-hero text-white rounded-t-lg">
        <CardTitle className="text-2xl text-center">Billboard Booking Request</CardTitle>
      </CardHeader>

      <CardContent className="px-4 500:px-6 md:px-8 py-8">
        <form id="booking-form" onSubmit={handleSubmit} className="grid gap-6">
          <div className="inputs-wrap grid gap-6">
            {/* Row 1: Full Name and Brand Name */}
            <div className="w-full grid items-end gap-x-4 gap-y-6 md:grid-cols-2">
              <RegularInput
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.fullName : undefined}
                label="Full Name"
                placeholder="Enter your full name"
                required
              />
              <RegularInput
                name="brandName"
                value={formValues.brandName}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.brandName : undefined}
                label="Brand Name"
                placeholder="Enter brand name"
                required={false}
              />
            </div>

            {/* Row 2: Email and Phone Number */}
            <div className="w-full grid items-end gap-x-4 gap-y-6 md:grid-cols-2">
              <RegularInput
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.email : undefined}
                label="Email Address"
                placeholder="your.email@company.com"
                required
              />
              <RegularInput
                name="phoneNumber"
                type="tel"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.phoneNumber : undefined}
                label="Phone Number"
                placeholder="eg. 08123456789"
                required
              />
            </div>

            {/* Billboard Faces - Dynamic Array */}
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Billboard Faces ({formValues.faces.length})
                </label>
                <RegularBtn
                  type="button"
                  variant="outline"
                  size="sm"
                  text="Add Face"
                  LeftIcon={Plus}
                  onClick={addFace}
                />
              </div>

              {formValues.faces.map((face, faceIndex) => (
                <Card key={faceIndex} className="border-2 border-border p-4 h-fit grid gap-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">Face {faceIndex + 1}</h4>
                    {formValues.faces.length > 1 && (
                      <RegularBtn
                        type="button"
                        variant="ghost"
                        size="sm"
                        LeftIcon={X}
                        onClick={() => removeFace(faceIndex)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      />
                    )}
                  </div>

                  <div className="h-fit grid gap-6">
                    {/* Billboard Face Select */}
                    <RegularSelect
                      value={face.billboardFace}
                      onSelectChange={val => handleFaceChange(faceIndex, 'billboardFace', val)}
                      name={`faces.${faceIndex}.billboardFace`}
                      errors={undefined}
                      label="Select Billboard Face"
                      placeholder="Choose a billboard face"
                      options={locationOptions}
                      required
                    />

                    {/* Start Date and End Date */}
                    <div className="grid items-end gap-x-4 gap-y-6 md:grid-cols-2">
                      <RegularInput
                        name={`faces.${faceIndex}.startDate`}
                        type="date"
                        value={face.startDate}
                        onChange={e => handleFaceChange(faceIndex, 'startDate', e.target.value)}
                        errors={undefined}
                        label="Start Date"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <RegularInput
                        name={`faces.${faceIndex}.endDate`}
                        type="date"
                        value={face.endDate}
                        onChange={e => handleFaceChange(faceIndex, 'endDate', e.target.value)}
                        errors={undefined}
                        label="End Date"
                        min={
                          formValues.faces[faceIndex]?.startDate ||
                          new Date().toISOString().split('T')[0]
                        }
                        required
                      />
                    </div>
                  </div>
                </Card>
              ))}

              {errorsVisible && formErrors.faces && Array.isArray(formErrors.faces) && (
                <p className="text-xs md:text-sm text-red-500">{formErrors.faces[0]}</p>
              )}
            </div>

            {/* Additional Notes Textarea */}
            <div className="w-full">
              <RegularTextarea
                name="note"
                value={formValues.note}
                onChange={handleInputChange}
                errors={errorsVisible ? formErrors.note : undefined}
                label="Additional Notes"
                placeholder="Tell us about your advertising goals, budget or any special requirements"
                rows={4}
                required={false}
              />
            </div>
          </div>

          {formErrors.root && (
            <p className={cn('text-xs md:text-sm text-red-500 mt-1')}>{formErrors.root[0]}</p>
          )}

          <div className="w-full flex items-center">
            <RegularBtn
              type="submit"
              variant="cta"
              size="full"
              className=""
              text="Request Booking"
              loading={loading}
              disabled={!formValid}
              onDisabledClick={generalValidation}
              RightIcon={submitted ? CheckCheck : undefined}
              rightIconProps={{ className: 'size-4 text-white' }}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
