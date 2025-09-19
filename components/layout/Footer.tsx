'use client';

import { GhostBtn } from '../atoms/GhostBtn';
import { LogoFull } from '../icons';
import { CONTACT_CARDS_FOR_FOOTER, NAV_LINKS, SOCIALS } from '@/lib/constants/texts';
import { ContactCardProps, ContactCardText, SocialBtn } from '../sections/home/Contact';
import { HeaderLinkProps } from './Header';
import { useInPageNav } from '@/lib/hooks/use-inpage-nav';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pin-gray-dark text-white py-16">
      <div className="regular-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <GhostBtn Icon={LogoFull} iconClass="text-white text-2xl" linkProps={{ href: '/' }} />
            </div>
            <p className="text-gray-300 leading-relaxed">
              A subsidiary of Pinpoint Global, specializing in strategic billboard advertising that
              connects brands with their target audiences through premium outdoor placements.
            </p>
            <div className="flex space-x-4 text-white">
              {SOCIALS.map((social, idx) => (
                <SocialBtn key={idx} {...social} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((item, idx) => (
                <FooterLink key={idx} {...item} />
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="space-y-3 text-gray-300">
              {CONTACT_CARDS_FOR_FOOTER.map((item, idx) => (
                <FooterContactRow key={idx} {...item} />
              ))}
              {/* <p>📞 +1 (555) PIN-GLOB</p>
              <p>✉️ hello@pinglobal.com</p>
              <p>
                📍 123 Billboard Ave, Suite 500
                <br />
                New York, NY 10001
              </p>
              <p>🕒 Mon - Fri: 9:00 AM - 6:00 PM</p> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Pin Global. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* <a
              href="#"
              className="text-gray-400 hover:text-pin-red text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pin-red text-sm transition-colors duration-200">
              Terms of Service
            </a> */}
            <a
              href="https://pinpoint.ng"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-400 hover:text-pin-red text-sm transition-colors duration-200">
              Pinpoint Global
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, footerOnlySuffix, href, afterClick }: HeaderLinkProps) => {
  const { elementExists, targetElRef, inHomePage } = useInPageNav({ href });

  return (
    <li className={`${href === '/' && inHomePage ? 'hidden' : ''}`}>
      <GhostBtn
        className={``}
        linkProps={{ href: elementExists ? '#' : href, preventdefault: 'true' }}
        onClick={() => {
          if (targetElRef.current) {
            targetElRef.current.scrollIntoView({ behavior: 'smooth' });
          }

          afterClick?.();
        }}>
        <div className="w-fit px-0 relative">
          <p className="text-gray-300 hover:text-pin-red-light transition-colors duration-200">
            {text}
            {footerOnlySuffix || ''}
          </p>
          {/* <div className="w-full max-w-0 group-hover:max-w-full h-[2px] bg-gradient-primary absolute -bottom-1 left-0 transition-all duration-500 ease-in" /> */}
        </div>
      </GhostBtn>
    </li>
  );
};

const FooterContactRow = ({
  LucideIcon,
  Icon,
  texts,
}: Omit<ContactCardProps, 'title' | 'subtitle'>) => {
  return (
    <div className="flex items-center">
      {LucideIcon && <LucideIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />}
      {Icon && (
        <i className="text-xl text-primary mr-3 flex-none mt-0.5">
          <Icon />
        </i>
      )}
      <div className="grid gap-3 font-montserrat text-gray-300">
        {texts.map((item, idx) => (
          <ContactCardText key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};
