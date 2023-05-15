import { useContext } from "react";
import AlbumAdminContext from "context/admin/album.context/AlbumAdminContext";
import ArtistAdminContext from "context/admin/artist.context/ArtistAdminContext";
import GenreAdminContext from "context/admin/genre.context/GenreAdminContext";
import TrackAdminContext from "context/admin/track.context/TrackAdminContext";
import { Col, Row, Statistic } from "antd";

export default function HomeAdminComponent() {
  const { albums } = useContext(AlbumAdminContext)
  const { artists } = useContext(ArtistAdminContext)
  const { genres } = useContext(GenreAdminContext)
  const { tracks } = useContext(TrackAdminContext)
  return (
    <Row style={{
      display: 'flex',
      justifyContent: 'center',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <StatisticItem title='Albums' total={albums.length} />
      <StatisticItem title='Artists' total={artists.length} />
      <StatisticItem title='Genres' total={genres.length} />
      <StatisticItem title='Tracks' total={tracks.length} />
      <StatisticItem title='Playlists' total={815000} />
    </Row>

  )
}

function StatisticItem({ title, total }: { title: string, total: number }) {
  return (
    <Col style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }} span={8} sm={6} md={4}>
      <Statistic title={title} value={total} />
    </Col>
  )
}