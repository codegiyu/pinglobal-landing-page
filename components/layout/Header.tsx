'use client';

import { ComponentProps, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoFull } from '../icons';
import { RegularBtn } from '../atoms/RegularBtn';
import { GhostBtn } from '../atoms/GhostBtn';
import { useInPageNav } from '@/lib/hooks/use-inpage-nav';
import { NAV_LINKS } from '@/lib/constants/texts';

export type HeaderProps = ComponentProps<'header'> & {
  solidBackground?: boolean;
};

export const Header = ({ className, solidBackground, ...props }: HeaderProps) => {
  const [hasSolidBg, setHasSolidBg] = useState(!!solidBackground);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handlePageOffset = () => {
      const { scrollY } = window;
      setHasSolidBg(scrollY > 0 ? true : !!solidBackground);
    };
    const handlePageResize = () => {
      setMenuOpen(false);
    };

    handlePageOffset();
    window.addEventListener('scroll', handlePageOffset);
    window.addEventListener('resize', handlePageResize);

    return () => {
      window.removeEventListener('scroll', handlePageOffset);
      window.removeEventListener('resize', handlePageResize);
    };
  }, [solidBackground]);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${hasSolidBg || menuOpen ? 'bg-white/90 backdrop-blur-sm border-b border-primary/10' : 'bg-transparent'} 
      transition-colors duration-200 ease-in
      ${className ?? ''}`}
      {...props}>
      <div className="regular-container">
        <div
          className={`flex justify-between items-center py-4 ${hasSolidBg || menuOpen ? 'lg:py-5' : 'lg:py-8'}`}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <GhostBtn
              Icon={LogoFull}
              iconClass={`${hasSolidBg || menuOpen ? 'text-[2rem] text-primary' : 'text-[2rem] text-white'} transition-all duration-300 ease-in`}
              linkProps={{ href: '/' }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="">
            <ul className="list-none hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((item, idx) => (
                <HeaderLink key={idx} {...item} hasSolidBg={hasSolidBg} />
              ))}
              <CTAButton />
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <GhostBtn
            className={`lg:hidden p-2 rounded-md ${hasSolidBg || menuOpen ? 'text-primary hover:scale-105' : 'text-white hover:scale-105'} transition-all duration-300 ease-in`}
            wrapClassName="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </GhostBtn>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-border py-6">
          <ul className="list-none grid px-6 pb-6 space-y-0">
            {NAV_LINKS.map((item, idx) => (
              <HeaderLink key={idx} {...item} afterClick={() => setMenuOpen(false)} />
            ))}
          </ul>
          <div className="w-full px-6">
            <CTAButton setMenuOpen={setMenuOpen} />
          </div>
        </nav>
      )}
    </header>
  );
};

export interface HeaderLinkProps {
  text: string;
  href: string;
  footerOnlySuffix?: string;
  afterClick?: () => void;
  hasSolidBg?: boolean;
}

const HeaderLink = ({ text, href, afterClick, hasSolidBg }: HeaderLinkProps) => {
  const { elementExists, targetElRef, inHomePage, isActive } = useInPageNav({
    href,
    trackElement: true,
  });

  return (
    <li className={`${href === '/' && inHomePage ? 'hidden' : ''}`}>
      <GhostBtn
        className={`w-full lg:w-fit py-3 lg:py-0 ${isActive ? 'bg-primary-soft lg:bg-transparent' : 'hover:bg-primary-soft lg:hover:bg-transparent'}`}
        wrapClassName={`w-full lg:w-fit`}
        linkProps={{ href: elementExists ? '#' : href, preventdefault: 'true' }}
        onClick={() => {
          setTimeout(() => {
            if (targetElRef.current) {
              targetElRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 200);

          afterClick?.();
        }}>
        <div className="w-full lg:w-fit px-0 relative">
          <p
            className={`font-poppins text-[0.875rem] lg:text-[0.875rem] transition-colors duration-200 
            text-dark ${hasSolidBg ? '' : 'lg:text-white'}
            ${isActive ? 'text-primary font-medium' : 'hover:text-primary'}`}>
            {text}
          </p>
          <div className="hidden lg:block w-full max-w-0 group-hover:max-w-full h-[2px] bg-gradient-primary absolute -bottom-1 left-0 transition-all duration-500 ease-in" />
        </div>
      </GhostBtn>
    </li>
  );
};

const CTAButton = ({ setMenuOpen }: { setMenuOpen?: (val: boolean) => void }) => {
  const { targetElRef } = useInPageNav({ href: '/#book-billboard' });

  return (
    <>
      <div className="w-full lg:hidden">
        <RegularBtn
          linkProps={{ href: '#', preventdefault: 'true' }}
          onClick={() => {
            setTimeout(() => {
              if (targetElRef.current) {
                targetElRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }, 200);

            setMenuOpen?.(false);
          }}
          size="full"
          text="Book a Billboard"
        />
      </div>
      <div className="w-fit hidden lg:block">
        <RegularBtn
          linkProps={{ href: '#', preventdefault: 'true' }}
          onClick={() => {
            setTimeout(() => {
              if (targetElRef.current) {
                targetElRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }, 200);
          }}
          text="Book a Billboard"
        />
      </div>
    </>
  );
};
