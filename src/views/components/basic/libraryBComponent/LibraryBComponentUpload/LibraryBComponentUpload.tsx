import './libraryBComponentUpload.scss';
import TrackListComponent from '../../trackListComponent/TrackListComponent'
import { useTranslation } from "react-i18next";

export default function LibraryBComponentUpload() {
  const { t } = useTranslation();

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', () => {
      if (input.files && input.files[0]) {
        console.log('File uploaded:', input.files[0])
      }
    })
    input.click()
  }

  return (
    <div className='library-upload'>
      <div className='library-upload__content'>
        <h1>{t('library_upload_h1')}</h1>
        <button onClick={handleFileUpload}>{t('library_upload_btn')}</button>
      </div>
      <div>
        <TrackListComponent />
      </div>
    </div >
  ); 
}