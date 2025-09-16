import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  title: string;
  text?: string;
  className?: string;
}

export const SectionHeading = ({ title, text, className }: SectionHeadingProps) => {
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-5xl text-dark">
        {title}
      </h2>
      <div
        className={`w-20 h-1 bg-gradient-primary rounded-full ${className?.includes('text-center') ? 'mx-auto' : ''}`}
      />
      {text && (
        <p className="font-montserrat text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-2">
          {text}
        </p>
      )}
    </div>
  );
};
