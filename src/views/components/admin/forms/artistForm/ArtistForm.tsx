import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Form, Image, Input, Select, Upload, message } from 'antd'
import GenreAdminContext from 'context/admin/genre.context/GenreAdminContext'
import AlbumAdminContext from 'context/admin/album.context/AlbumAdminContext'
import ArtistAdminContext from 'context/admin/artist.context/ArtistAdminContext'
import TrackAdminContext from 'context/admin/track.context/TrackAdminContext'
import PlaylistAdminContext from 'context/admin/playlist.context/PlaylistAdminContext'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { SelectProps } from 'antd';

export default function ArtistForm() {
	const { artistId } = useParams()
	const { artists, postArtist, updateArtist } = useContext(ArtistAdminContext)
	const { genres } = useContext(GenreAdminContext)
	const { albums } = useContext(AlbumAdminContext)
	const { tracks } = useContext(TrackAdminContext)
	const { playlists } = useContext(PlaylistAdminContext)
	const [messageApi, contextHolder] = message.useMessage()
	const findArtist: any = artists.find((artist: any) => artist._id === artistId)

	const genresOptions: SelectProps['options'] = [];
	genres.forEach((genre: any) => {
		genresOptions.push({
			label: genre.name,
			value: genre._id,
		});
	});

	const albumsOptions: SelectProps['options'] = [];
	albums.forEach((album: any) => {
		albumsOptions.push({
			label: album.name,
			value: album._id,
		});
	});

	const tracksOptions: SelectProps['options'] = [];
	tracks.forEach((track: any) => {
		tracksOptions.push({
			label: track.name,
			value: track._id,
		});
	});

	const playlistsOptions: SelectProps['options'] = [];
	playlists.forEach((playlist: any) => {
		playlistsOptions.push({
			label: playlist.name,
			value: playlist._id,
		});
	});

	return (
		<div style={{ maxWidth: 600, margin: '0 auto' }} >
			{contextHolder}
			<h1 style={{ textAlign: 'center' }}>{artistId ? 'Update' : 'Create'} Artist</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 12 }}
				style={{ maxWidth: 600, margin: '0 auto' }}
				initialValues={{ remember: true }}
				onFinish={(values) => !artistId ? postArtist(values, messageApi) : updateArtist(values, findArtist, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: !artistId ? true : false, message: 'Please input artist name!' }]}
				>
					<Input placeholder='Introduce artist name' defaultValue={findArtist?.name} />
				</Form.Item>

				<Form.Item
					label="Genres"
					name="genres"
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select genres"
						defaultValue={findArtist?.genres}
						options={genresOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Albums"
					name="albums"
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select albums"
						defaultValue={findArtist?.albums}
						options={albumsOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Tracks"
					name="tracks"
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select tracks"
						defaultValue={findArtist?.tracks}
						options={tracksOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Playlists"
					name="playlists"
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select playlists"
						defaultValue={findArtist?.playlists}
						options={playlistsOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Image"
					name="image"
					rules={[{ required: !artistId ? true : false, message: 'Please upload an image!' }]}
				>
					<Upload
						name="avatar"
						listType="picture-card"
						maxCount={1}
						showUploadList={true}
					>
						Upload Image
					</Upload>
				</Form.Item>
				<div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 15 }}>
					<Image
						width={400}
						src={findArtist?.imageUrl}
					/>
				</div>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='text' style={{ marginRight: 20 }}>
						<Link to={'/admin/artists'}>
							<ArrowLeftOutlined /> Back to artists
						</Link>
					</Button>
					<Button type="primary" htmlType="submit">
						{artistId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}