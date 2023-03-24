import Gif1 from '../../../assets/img/gif/giphy1-unscreen.gif';
import "./commingSoon.scss";
import { useTranslation } from 'react-i18next';

export default function CommingSoon() {
  const { t } = useTranslation();
	return (
		<div className='comming-soon-component'>
			<img src={Gif1} alt="gif" />
			<p>{t("error_message")}</p>
		</div>
	)
}