'use client';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { Card, CardContent } from '@/components/general/Card';
import { CONTACT_CARDS, CONTACT_INFORMATION, SOCIALS } from '@/lib/constants/texts';
import { IconComp, LucideIconComp } from '@/lib/types/general';
import { MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="regular-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to amplify your brand? Our billboard advertising experts are here to help you
            reach your audience and maximize your marketing impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONTACT_CARDS.map((item, idx) => (
                <ContactCard key={idx} {...item} />
              ))}
            </div>

            {/* Social Media Links */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-6">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                {SOCIALS.map((social, idx) => (
                  <SocialBtn key={idx} {...social} />
                ))}
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="h-96 lg:h-full">
            <Card className="h-full shadow-pin-card border-pin-gray-light overflow-hidden">
              <div className="h-full bg-pin-gray-light flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-pin-red mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Pin Global Office</h3>
                  <p className="text-muted-foreground mb-4">
                    18 Aba Close, Area 8,
                    <br />
                    Garki, Abuja
                  </p>
                  <RegularBtn
                    variant="cta"
                    onClick={() => window.open(CONTACT_INFORMATION.locationUrl, '_blank')}>
                    Get Directions
                  </RegularBtn>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export interface ContactCardProps {
  LucideIcon?: LucideIconComp;
  Icon?: IconComp;
  title: string;
  texts: ContactCardTextProps[];
  subtitle?: string;
}

export interface ContactCardTextProps {
  text: string;
  link?: string;
}

const ContactCard = ({ LucideIcon, Icon, title, texts, subtitle }: ContactCardProps) => {
  return (
    <Card className="shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105 border-pin-gray-light">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
              {LucideIcon && <LucideIcon className="w-6 h-6 text-white" />}
              {!LucideIcon && Icon && (
                <i className="text-2xl text-white">
                  <Icon />
                </i>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <div className="grid gap-1 text-foreground">
              {texts.map((item, idx) => (
                <ContactCardText key={idx} {...item} />
              ))}
            </div>
            {subtitle && <p className="text-[0.8125rem] text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ContactCardText = ({ text, link }: ContactCardTextProps) => {
  return (
    <>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className="no-underline text-current hover:text-primary cursor-pointer">
          <span>{text}</span>
        </a>
      ) : (
        <span>{text}</span>
      )}
    </>
  );
};

export interface SocialBtnProps {
  Icon: IconComp;
  href: string;
  label: string;
}

export const SocialBtn = ({ Icon, href, label }: SocialBtnProps) => {
  return (
    <GhostBtn
      className="w-12 h-12 rounded-full text-current border border-pin-gray-light hover:bg-pin-red hover:text-white hover:border-pin-red transition-all duration-300"
      onClick={() => window.open(href, '_blank')}
      aria-label={label}>
      <i className="text-xl">
        <Icon />
      </i>
    </GhostBtn>
  );
};
