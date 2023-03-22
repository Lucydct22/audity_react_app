import TrackItemComponent from "./TrackItemComponent";
import './trackListStyle.scss'; 
import { getTracksApi } from "../../../../api/music/traks";
import React, { useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import image from './../../../../assets/img/png/beyonce.png'

const  TrackListComponent = () => {

  const { t } = useTranslation();


  return (
    <>
     <div className="page-content__track-list">
      <table>
        <thead>
        <tr>
          <td>{t("track_list_track")}</td>
          <td>&nbsp;</td> 
          <td>&nbsp;</td>
          <td>{t("track_list_artist")}</td>
          <td>{t("track_list_album")}</td>
          <td><AiOutlineClockCircle className='track-list-item__td-icon' /></td>
          <td>{t("track_list_rating")}</td>
        </tr>
        </thead>

        <tbody>
        <TrackItemComponent
              id={"1"}
              name={"Run the World"}
              artist={"Beyonce"}
              thumbnail={image}
              likes= {" 1000"}
              time={"3:54"}
              album={"Number 4"}
              />
        </tbody>
      </table>
      </div> 
    </>
  )
}

export default TrackListComponent

/*{Tracks.map( (track) => {
            return (
              <TrackItemComponent
              id={track.id}
              name={track.name}
              artist={track.artist}
              thumbnail={track.thumbnail}
              likes= {track.likes}
              album={track.album}
              />
            )
          })}*/
        