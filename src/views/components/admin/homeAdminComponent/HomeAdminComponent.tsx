import { useContext } from "react";
import { Link } from "react-router-dom";
import AlbumAdminContext from "context/admin/album.context/AlbumAdminContext";
import ArtistAdminContext from "context/admin/artist.context/ArtistAdminContext";
import GenreAdminContext from "context/admin/genre.context/GenreAdminContext";
import TrackAdminContext from "context/admin/track.context/TrackAdminContext";
import PlaylistAdminContext from "context/admin/playlist.context/PlaylistAdminContext";
import UserAdminContext from "context/admin/user.context/UserAdminContext";
import { Col, Row, Statistic } from "antd";
import StatisticAdminContext from "context/admin/statistic.context/StatisticAdminContext";

export default function HomeAdminComponent() {
  const { albums } = useContext(AlbumAdminContext)
  const { artists } = useContext(ArtistAdminContext)
  const { genres } = useContext(GenreAdminContext)
  const { tracks } = useContext(TrackAdminContext)
  const { playlists } = useContext(PlaylistAdminContext)
  const { users } = useContext(UserAdminContext)
  const { totalLikes, totalTracksPlayed, tracksFailed } = useContext(StatisticAdminContext)
  console.info({ tracksFailed: tracksFailed});
  return (
    <Row style={{
      display: 'flex',
      justifyContent: 'center',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <StatisticItem title='Users' total={users.length} link='/admin/users' />
      <StatisticItem title='Albums' total={albums.length} link='/admin/albums' />
      <StatisticItem title='Artists' total={artists.length} link='/admin/artists' />
      <StatisticItem title='Genres' total={genres.length} link='/admin/genres' />
      <StatisticItem title='Tracks' total={tracks.length} link='/admin/tracks' />
      <StatisticItem title='Playlists' total={playlists.length} link='/admin/playlists' />
      <StatisticItem title='Total likes' total={totalLikes} />
      <StatisticItem title='Reproductions' total={totalTracksPlayed} />
      <StatisticItem title='Tracks failed' total={tracksFailed.length} />
    </Row>
  )
}

function StatisticItem({ title, total, link }: any) {
  return (
    <Col style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }} span={8} sm={6} md={4}>
      <Link to={link}>
        <Statistic title={title} value={total} />
      </Link>
    </Col>
  )
}