'use client';
import { Link } from '@/src/i18n/navigation';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import React from 'react';

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  asNavigationLink?: boolean;
  className?: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    { href = '', children, className = '', asNavigationLink = false, ...props },
    ref,
  ) => {
    const isExternal = href.startsWith('http');
    const localizedHref = isExternal
      ? href
      : `${href.startsWith('/') ? href : `/${href}`}`;

    const Wrapper = asNavigationLink ? NavigationMenu.Link : React.Fragment;
    const wrapperProps = asNavigationLink ? { asChild: true } : {};

    return (
      <Wrapper {...wrapperProps}>
        <Link
          href={localizedHref as any}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </Link>
      </Wrapper>
    );
  },
);

CustomLink.displayName = 'CustomLink';
export default CustomLink;
