import { Suspense, lazy } from "react";
import { Outlet } from 'react-router-dom'
import './libraryLayout.scss';

const LibraryHeader = lazy(() => import('views/components/basic/libraryBComponent/libraryHeader/LibraryHeader'));

const LibraryLayout = () => {
  return (
    <Suspense fallback={<></>}>
      <LibraryHeader />
      <Outlet />
    </Suspense>
  )
}

export default LibraryLayout;