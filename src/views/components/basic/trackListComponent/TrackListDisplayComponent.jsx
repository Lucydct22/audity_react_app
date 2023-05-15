import TrackItemComponent from "./TrackItemComponent";
import "./trackListStyle.scss";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getTracksApi } from "api/music/tracks";
import { joinArtistsName } from "views/utils/joinArtistsName";
import formatToSeconds from "utils/tracks/formatToSeconds";


export default function TrackListDisplayComponent() {
  const [tracks, setTracks] = useState(undefined);
  const { t } = useTranslation();
  useEffect(() => {
    let isMounted = true;
    getTracksApi().then((res) => {
      isMounted && res && setTracks(res.tracks);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>{t("track_list_track")}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>{t("track_list_artist")}</td>
            <td>{t("track_list_album")}</td>
            <td>
              <AiOutlineClockCircle className="track-list-item__td-icon" />
            </td>
            <td>{t("track_list_rating")}</td>
          </tr>
        </thead>
        <tbody>
          {tracks &&
            tracks.map((track) => {
              const { _id, name, artists, imageUrl, likedBy, duration, album } = track;
              const artistsName = joinArtistsName(artists);
              return (
                <TrackItemComponent
                  key={_id}
                  id={_id}
                  name={name}
                  artist={artistsName}
                  thumbnail={imageUrl}
                  likes={likedBy.length}
                  time={formatToSeconds(duration)}
                  album={album?.name}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
