import Gif1 from '../../../assets/img/gif/giphy1-unscreen.gif';
import "./commingSoon.scss";

export default function CommingSoon() {
	return (
		<div className='comming-soon-component'>
			<img src={Gif1} alt="gif" />
			<p>We are sorry for the inconvenience, we keep working on it ...</p>
		</div>
	)
}