import { cn } from '@/lib/utils';
import { Input, type InputProps } from '../ui/input';
import { FocusEvent, ReactNode } from 'react';
import { InputWrapper } from '../general/InputWrapper';

export interface RegularInputProps extends InputProps {
  label?: string;
  subtext?: string;
  labelClassName?: string;
  wrapClassName?: string;
  errors?: string[];
  bottomText?: ReactNode;
}

export const RegularInput = ({
  className,
  type,
  label,
  subtext,
  labelClassName,
  wrapClassName,
  placeholder,
  ref,
  required,
  onFocus,
  onBlur,
  errors = [],
  ...props
}: RegularInputProps) => {
  return (
    <InputWrapper
      wrapClassName={wrapClassName}
      label={label}
      subtext={subtext}
      labelTextClassName={labelClassName}
      required={required}
      errors={errors}>
      <Input
        placeholder={placeholder}
        type={type}
        className={cn('', className)}
        ref={ref}
        {...props}
        onFocus={(e: FocusEvent<HTMLInputElement>) => {
          if (onFocus) onFocus(e);
        }}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          if (onBlur) onBlur(e);
        }}
      />
    </InputWrapper>
  );
};
