import { useState } from 'react';
import './PlayerBottom.scss'

import { MdSkipPrevious } from "react-icons/md";
import { MdPause } from "react-icons/md";
import { MdPlayArrow } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { IoShuffleOutline } from "react-icons/io5";
import { IoRepeatOutline } from "react-icons/io5";
import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeMuteOutline } from "react-icons/io5";



const PlayerBottomComponent = () => {
  const [songState, setSongState] = useState(false);
  const [songLike, setSongLike] = useState(false);
  const [songVolume, setSongVolume] = useState(false);


  return (
    <div className='page-player'>
      <div className='player-bottom'>

        <div className='player-bottom-controls'>
          <button className='page-player-bottom__btn'>
            <MdSkipPrevious />
          </button>
          {songState ?
            <button className='page-player-bottom__btn' onClick={() => setSongState(!songState)}>
              <MdPause />
            </button>
            :
            <button className='page-player-bottom__btn' onClick={() => setSongState(!songState)}>
              <MdPlayArrow />
            </button>
          }
          <button className='page-player-bottom__btn'>
            <MdSkipNext />
          </button>
        </div>

        <div className='player-bottom-track'>
          00:00
          <div className='player-bottom-track__container'>
            <div className='player-bottom-track__container--heading'>
              <div className='player-bottom-track__container--heading__title'>
                Piece Of Your Heart · Meduza
              </div>
              <div className='player-bottom-track__container--heading__actions'>
                <button className='page-player-bottom__btn'>
                  <IoAddOutline />
                </button>
                {songLike ?
                  <button className='page-player-bottom__btn' onClick={() => setSongLike(!songLike)}>
                    <AiFillHeart size='1.5rem' color='#ef5466' />
                  </button>
                  :
                  <button className='page-player-bottom__btn' onClick={() => setSongLike(!songLike)}>
                    <AiOutlineHeart />
                  </button>
                }
              </div>
            </div>
            <div className='player-bottom-track__container--seekbar'>
              <hr />
            </div>
          </div>
          2:34
        </div>

        <div className='player-bottom-options'>
          <button className='page-player-bottom__btn'>
            <IoShuffleOutline />
          </button>
          <button className='page-player-bottom__btn'>
            <IoRepeatOutline />
          </button>
          {songVolume ?
            <button className='page-player-bottom__btn' onClick={() => setSongVolume(!songVolume)}>
              <IoVolumeMuteOutline />
            </button>
            :
            <button className='page-player-bottom__btn' onClick={() => setSongVolume(!songVolume)}>
              <IoVolumeHighOutline />
            </button>
          }
        </div>

      </div>
    </div>
  )
}

export default PlayerBottomComponent;