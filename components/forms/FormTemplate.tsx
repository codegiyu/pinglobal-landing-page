'use client';
import { FileUploadInput, FileUploadInputProps } from '@/components/atoms/FileUploadInput';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { RegularInput, RegularInputProps } from '@/components/atoms/RegularInput';
import { RegularTextarea, RegularTextareaProps } from '@/components/atoms/RegularTextarea';
import { toast } from '@/components/atoms/Toast';
import { useForm } from '@/lib/hooks/use-form';
import { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useMemo } from 'react';
import { output, z, ZodArray, ZodEmail, ZodObject, ZodString } from 'zod';
import { CheckCheck } from 'lucide-react';
import { RegularSelect, RegularSelectProps } from '@/components/atoms/RegularSelect';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../general/Card';

export type StringOrStringArraySchema = ZodString | ZodEmail | ZodArray<ZodString>;
export interface RequestFormProps<
  TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>,
> {
  formId: string;
  formName: string;
  formTitle: string;
  btnText?: string;
  formSchema: TSchema;
  defaultFormValues: z.infer<TSchema>;
  inputChangeWatch?: Partial<
    Record<keyof z.infer<TSchema>, (updatedFormValues: z.infer<TSchema>) => z.infer<TSchema>>
  >;
  inputsArr: (FormArrayItem<TSchema> | [FormArrayItem<TSchema>, FormArrayItem<TSchema>])[];
  filesRequired?: boolean;
}
interface BaseFormArrayItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>> {
  name?: keyof z.TypeOf<TSchema>;
  kind: 'input' | 'textarea' | 'select' | 'multiselect' | 'file';
  inputProps?: Omit<RegularInputProps, 'name' | 'value' | 'onChange' | 'errors'>;
  textareaProps?: Omit<RegularTextareaProps, 'name' | 'value' | 'onChange' | 'errors'>;
  selectProps?: Omit<RegularSelectProps, 'name' | 'value' | 'onSelectChange' | 'errors'>;
  fileProps?: Omit<FileUploadInputProps, 'files' | 'setFiles'>;
}
interface FormInputItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'input';
  inputProps: Omit<RegularInputProps, 'name' | 'value' | 'onChange' | 'errors'>;
  textareaProps?: never;
  selectProps?: never;
  fileProps?: never;
}
interface FormTextareaItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'textarea';
  textareaProps: Omit<RegularTextareaProps, 'name' | 'value' | 'onChange' | 'errors'>;
  inputProps?: never;
  selectProps?: never;
  fileProps?: never;
}
interface FormSelectItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name: keyof z.TypeOf<TSchema>;
  kind: 'select';
  selectProps: Omit<RegularSelectProps, 'name' | 'value' | 'onSelectChange' | 'errors'>;
  inputProps?: never;
  textareaProps?: never;
  fileProps?: never;
}
interface FormFileItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  name?: never;
  kind: 'file';
  fileProps: Omit<FileUploadInputProps, 'files' | 'setFiles'>;
  inputProps?: never;
  textareaProps?: never;
  selectProps?: never;
}

export type FormArrayItem<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>> =
  | FormInputItem<TSchema>
  | FormTextareaItem<TSchema>
  | FormSelectItem<TSchema>
  | FormFileItem<TSchema>;

export interface RequestFormFileProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export const RequestForm = memo(
  <TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>({
    formId,
    formName,
    formTitle,
    btnText,
    formSchema,
    defaultFormValues,
    files,
    setFiles,
    inputsArr,
    inputChangeWatch,
    filesRequired,
  }: RequestFormProps<TSchema> & RequestFormFileProps) => {
    const {
      formValues,
      formErrors,
      loading,
      isValid,
      errorsVisible,
      submitted,
      resetForm,
      handleInputChange,
      onChange,
      setFormErrors,
      setFormValues,
      handleSubmit,
      validateForm,
    } = useForm({
      formSchema,
      defaultFormValues,
      onSubmit,
      validateOnChange: true,
      inputChangeWatch,
    });

    const formValid = useMemo(
      () => (isValid && filesRequired ? !!files.length : true),
      [isValid, files, filesRequired]
    );

    const generalValidation = () => {
      if (filesRequired && !files.length) {
        toast({ title: 'Please upload at least one file', variant: 'error' });
      }

      return validateForm() && filesRequired ? !!files.length : true;
    };

    async function onSubmit(values: z.infer<typeof formSchema>): Promise<boolean> {
      if (!generalValidation()) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required fields.',
          variant: 'error',
        });
        return false;
      }

      const formData = new FormData();

      formData.append('formName', formName);
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(val => formData.append(key, val));
        } else {
          formData.append(key, value);
        }
      });
      files.forEach(file => {
        formData.append('files', file);
      });

      const res = await fetch('/api/send-company-mail', {
        method: 'POST',
        body: formData,
      });

      const parsedRes = await res.json();

      if (parsedRes.error) {
        toast({ title: parsedRes.message, variant: 'error' });
        console.error({ error: parsedRes });
        setFormErrors({ root: [String(parsedRes.error)] } as Partial<
          Record<keyof output<TSchema> | 'root', string[] | undefined>
        >);
      }

      if (parsedRes.success) {
        toast({
          title: 'Booking Request Submitted!',
          description:
            "We'll contact you within 24 hours to discuss your billboard advertising needs.",
          variant: 'success',
        });
        resetForm();
        setFiles([]);
        return true;
      }

      return false;
    }

    useEffect(() => {
      console.log({ formValues });
    }, [formValues]);

    useEffect(() => {
      const onHashChange = () => {
        if (window.location.hash) {
          const hash = window.location.hash.substring(1); // remove '#'
          console.log('Got hash:', hash);
          const [input, value] = hash.split(':');

          if (!input || !(input in formValues)) return;

          setFormValues(prev => ({ ...prev, [input]: decodeURIComponent(value) }));

          // Remove hash immediately
          history.replaceState(null, '', window.location.pathname);
        }
      };

      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Card className="shadow-pin-button border-pin-gray-light">
        <CardHeader className="bg-gradient-hero text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">{formTitle}</CardTitle>
        </CardHeader>

        <CardContent className="px-4 500:px-6 md:px-8 py-8">
          <form id={formId} onSubmit={handleSubmit} className="grid gap-6">
            <div className="inputs-wrap grid gap-6">
              {inputsArr.map((item, idx) => (
                <div key={idx} className="w-full">
                  {Array.isArray(item) ? (
                    <div className="w-full grid items-end gap-x-4 gap-y-6 md:grid-cols-2">
                      {item.map((input, index) => (
                        <FormInputItem
                          key={index}
                          {...input}
                          {...{
                            files,
                            setFiles,
                            formValues,
                            formErrors,
                            handleInputChange,
                            onChange,
                            errorsVisible,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <FormInputItem
                      key={idx}
                      {...item}
                      {...{
                        files,
                        setFiles,
                        formValues,
                        formErrors,
                        handleInputChange,
                        onChange,
                        errorsVisible,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {formErrors.root && (
              <p className={cn('text-xs md:text-sm text-red-500 mt-1')}>{formErrors.root[0]}</p>
            )}

            <div className="w-full flex items-center">
              <RegularBtn
                type="submit"
                variant="cta"
                // typo="hero"
                size="full"
                className=""
                text={btnText || 'Submit'}
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
  }
);
RequestForm.displayName = 'RequestForm';

interface BaseInputItemProps<TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>
  extends BaseFormArrayItem<TSchema> {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  formValues: z.TypeOf<TSchema>;
  formErrors: Partial<Record<keyof z.TypeOf<TSchema>, string[] | undefined>>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    options?: {
      clearFields?: (keyof z.TypeOf<TSchema>)[];
    }
  ) => void;
  onChange: (
    name: keyof z.TypeOf<TSchema>,
    value: string | string[] | number | boolean,
    options?: {
      clearFields?: (keyof z.TypeOf<TSchema>)[];
    }
  ) => void;
  errorsVisible?: boolean;
}

const FormInputItem = <TSchema extends ZodObject<Record<string, StringOrStringArraySchema>>>({
  name,
  kind,
  inputProps,
  textareaProps,
  selectProps,
  fileProps,
  files,
  setFiles,
  formValues,
  formErrors,
  handleInputChange,
  onChange,
  errorsVisible,
}: BaseInputItemProps<TSchema>) => {
  if (kind === 'input' && name) {
    return (
      <RegularInput
        name={name as string}
        value={formValues[name]}
        onChange={handleInputChange}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...inputProps}
      />
    );
  }

  if (kind === 'textarea' && name) {
    return (
      <RegularTextarea
        name={name as string}
        value={formValues[name]}
        onChange={handleInputChange}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...textareaProps}
      />
    );
  }

  if (kind === 'select' && name && selectProps) {
    // if (name === 'package') {
    //   console.log({ value: formValues[name], loc: 'form input and kind is select' });
    // }
    return (
      <RegularSelect
        value={formValues[name] as string}
        onSelectChange={val => onChange(name, val)}
        name={name as string}
        errors={errorsVisible ? formErrors[name] : undefined}
        {...selectProps}
      />
    );
  }

  if (kind === 'file') {
    return <FileUploadInput files={files} setFiles={setFiles} {...fileProps} />;
  }

  return null;
};
