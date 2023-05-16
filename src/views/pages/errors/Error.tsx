import HelmetSEO from "views/utils/HelmetSEO";
import ErrorBComponent from "views/components/basic/errorBComponent/ErrorBComponent";

export default function Error() {
  return (
    <HelmetSEO
      title='Error 404 | Audity'
      description='Audity Error Page'
    >
      <div><ErrorBComponent/></div>
    </HelmetSEO>
  )
}
