import TrackItemComponent from "@/views/components/basic/trackListComponent/TrackItemComponent";
import './trackListMobileStyle.scss';
// import { useTranslation } from 'react-i18next';
import image from '@/assets/img/png/beyonce.png';

const TrackListMobileComponent = () => {
  // const { t } = useTranslation();

  return (
    <>
      <TrackItemComponent
        id={"1"}
        name={"Run the World"}
        artist={"Beyonce"}
        thumbnail={image}
        likes={" 1000"}
        time={"3:54"}
        album={"Number 4"}
      />
    </>
  )
}
export default TrackListMobileComponent;