import { Suspense, lazy } from "react";
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import './libraryLayout.scss';
import Spinner from 'views/UI/spinner';

const LibraryHeader = lazy(() => import('views/components/basic/libraryBComponent/libraryHeader/LibraryHeader'));

const LibraryLayout = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Suspense fallback={<></>}>
      <section className="library-page">
        <LibraryHeader />
        <Outlet />
      </section>
    </Suspense>
  )
}

export default LibraryLayout;