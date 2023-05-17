import { Suspense } from "react";
import TrackItemComponentDesktop from "../desktop/trackListComponentDesktop/TrackItemComponentDesktop";
import TrackItemComponentMobile from "../mobile/tracklistComponentMobile/TrackItemComponentMobile";
import "./trackListBComponent.scss";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { useTranslation } from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";
import { joinArtistsName } from "views/utils/joinArtistsName";
import formatToSeconds from "utils/tracks/formatToSeconds";

export default function TrackListBComponent({ tracksData }) {
  const screenWidth = useWindowSizeReport();

  return (
    <Suspense fallback={<></>}>
      {screenWidth > responsiveBreak ? (
        <TrackListDesktopComponent tracksData={tracksData} />
      ) : (
        <TrackListMobileComponent tracksData={tracksData} />
      )}
    </Suspense>
  );
}

const TrackListDesktopComponent = ({ tracksData }) => {
  const { t } = useTranslation();

  return (
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
        {tracksData &&
          tracksData.map((track) => {
            const { _id, name, artists, imageUrl, likedBy, duration, album } =
              track;
            const artistsName = joinArtistsName(artists);
            return (
              <TrackItemComponentDesktop
                id={_id}
                name={name ? name : track.uploadByUser.name}
                artist={artistsName ? artistsName : track.uploadByUser.artists}
                thumbnail={imageUrl}
                likes={likedBy.length}
                time={duration ? formatToSeconds(duration) : "-"}
                album={album?.name}
              />
            );
          })}
      </tbody>
    </table>
  );
};

const TrackListMobileComponent = ({ tracksData }) => {
  return (
    <main className="mobile-track-component">
      {tracksData &&
        tracksData.map((track) => {
          const { _id, name, artists, imageUrl, likedBy, duration, album } =
            track;
          const artistsName = joinArtistsName(artists);
          return (
            <TrackItemComponentMobile
              id={_id}
              name={name ? name : track.uploadByUser.name}
              artist={artistsName ? artistsName : track.uploadByUser.artists}
              thumbnail={imageUrl}
              likes={likedBy.length}
              time={duration ? formatToSeconds(duration) : "-"}
              album={album?.name}
            />
          );
        })}
    </main>
  );
};
