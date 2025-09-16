import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';

export type InputWrapperProps = PropsWithChildren<{
  wrapClassName?: string;
  label?: string;
  subtext?: string;
  labelTextClassName?: string;
  required?: boolean;
  errors?: string[];
  otherLabelProps?: Omit<ComponentPropsWithRef<'label'>, 'className'>;
}>;

export const InputWrapper = ({
  children,
  wrapClassName,
  label,
  subtext,
  labelTextClassName,
  otherLabelProps,
  required,
  errors = [],
}: InputWrapperProps) => {
  return (
    <label className={cn(`w-full`, wrapClassName)} {...otherLabelProps}>
      <div className={`flex flex-col justify-center gap-2`}>
        {label && (
          <span
            className={cn(
              'text-[0.75rem] leading-[1.2] font-medium text-dark font-poppins',
              labelTextClassName
            )}>
            {label}
            {required ? ' *' : ''}
            {subtext ? ` ${subtext}` : ''}
          </span>
        )}
        <div className="relative w-full">{children}</div>
      </div>
      {errors.length > 0 && (
        <p className={cn('text-xs md:text-sm text-red-500 mt-1')}>{errors[0]}</p>
      )}
    </label>
  );
};
