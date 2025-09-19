import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  title: string;
  text?: string;
  className?: string;
}

export const SectionHeading = ({ title, text, className }: SectionHeadingProps) => {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{title}</h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{text}</p>
    </div>
  );
};
