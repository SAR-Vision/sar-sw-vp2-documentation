import React from 'react';
import {Redirect} from '@docusaurus/router';
import {useLatestVersion} from '@docusaurus/plugin-content-docs/client';

export default function Home() {
  const latestVersion = useLatestVersion('default');
  const mainDoc = latestVersion.docs.find(doc => doc.id === latestVersion.mainDocId);

  return <Redirect to={mainDoc.path} />;
}
