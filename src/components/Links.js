import React from 'react';

import Step from './styled/Step';
import Heading from './styled/Heading';
import Link from './styled/Link';
import UnorderedList from './styled/UnorderedList';

import links from '../data/links';

export default function Links() {
  return (
    <Step>
      <Heading>Weitere Informationen zu den Loans:</Heading>
      <UnorderedList>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} target="_blank" rel="noreferrer noopener">
              <b>{link.text}</b> ({link.description})
            </Link>
          </li>
        ))}
      </UnorderedList>
    </Step>
  );
}
