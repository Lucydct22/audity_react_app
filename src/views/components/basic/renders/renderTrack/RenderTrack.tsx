import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import "./renderTrack.scss";
import { joinArtistsName } from "views/utils/joinArtistsName";

export default function RenderTrack({ track }: any) {
  const { name, imageUrl, artists } = track;
  const artistsName = joinArtistsName(artists);

  return (
    <div className="render-track">
      <div className="render-track__thumbnail">
        <div className="render-track__thumbnail--picture">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="render-track__thumbnail--btn">
          <div className="render-track__thumbnail--btn__play">
            <FaPlay size="14px" color="#191919" />
          </div>
        </div>
      </div>
      <div>
        <p className="render-track__name">{name}</p>
        <p className="render-track__artist">De {artistsName}</p>
      </div>
    </div>
  );
}
