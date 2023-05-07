import { Suspense, lazy } from "react";
import { Outlet } from 'react-router-dom'
import './libraryLayout.scss';

const LibraryHeader = lazy(() => import('views/components/basic/libraryBComponent/libraryHeader/LibraryHeader'));

const LibraryLayout = () => {
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