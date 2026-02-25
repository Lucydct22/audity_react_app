import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function HelmetSEO(props: Props) {
  const { title, description, children } = props;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
