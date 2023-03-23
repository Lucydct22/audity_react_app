import Gif1 from '../../../assets/img/gif/giphy.gif';
import "./commingSoon.scss";

export default function CommingSoon() {
	return (
		<div className='comming-soon-component'>
			<img src={Gif1} alt="gif" />
			<h1>We are sorry for the inconvenience, we keep working on it ...</h1>
		</div>
	)
}