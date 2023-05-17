import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import GenreAdminContext from 'context/admin/genre.context/GenreAdminContext'
import AlbumAdminContext from 'context/admin/album.context/AlbumAdminContext'
import ArtistAdminContext from 'context/admin/artist.context/ArtistAdminContext'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Image, Input, Select, Upload, message } from 'antd'
import type { SelectProps } from 'antd';
import TrackAdminContext from 'context/admin/track.context/TrackAdminContext'
import PlaylistAdminContext from 'context/admin/playlist.context/PlaylistAdminContext'

export default function TrackForm() {
	const { trackId } = useParams()
	const { tracks, postTrack, updateTrack } = useContext(TrackAdminContext)
	const { genres } = useContext(GenreAdminContext)
	const { artists } = useContext(ArtistAdminContext)
	const { albums } = useContext(AlbumAdminContext)
	const { playlists } = useContext(PlaylistAdminContext)
	const [messageApi, contextHolder] = message.useMessage()
	const track: any = tracks.find((track: any) => track._id === trackId)

	const genreOptions: SelectProps['options'] = [];
	genres.forEach((genre: any) => {
		genreOptions.push({
			label: genre.name,
			value: genre._id,
		});
	});

	const artistOptions: SelectProps['options'] = [];
	artists.forEach((artist: any) => {
		artistOptions.push({
			label: artist.name,
			value: artist._id,
		});
	});

	const albumOptions: SelectProps['options'] = [];
	albums.forEach((album: any) => {
		albumOptions.push({
			label: album.name,
			value: album._id,
		});
	});

	const playlistOptions: SelectProps['options'] = [];
	playlists.forEach((playlist: any) => {
		playlistOptions.push({
			label: playlist.name,
			value: playlist._id,
		});
	});

	return (
		<div style={{ maxWidth: 600, margin: '0 auto' }} >
			{contextHolder}
			<h1 style={{ textAlign: 'center' }}>{trackId ? 'Update' : 'Create'} Track</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 12 }}
				style={{ maxWidth: 600, margin: '0 auto' }}
				initialValues={{ remember: true }}
				onFinish={(values) => !trackId ? postTrack(values, messageApi) : updateTrack(values, track, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: !trackId ? true : false, message: 'Please input track name!' }]}
				>
					<Input placeholder='Introduce track name' defaultValue={track?.name} />
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
						defaultValue={track?.genres}
						options={genreOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Artists"
					name="artists"
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select artists"
						defaultValue={track?.artists}
						options={artistOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Album"
					name="album"
				>
					<Select
						allowClear
						style={{ width: '100%' }}
						placeholder="Select album"
						defaultValue={track?.album}
						options={albumOptions}
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
						defaultValue={track?.playlists}
						options={playlistOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Image"
					name="image"
					rules={[{ required: !trackId ? true : false, message: 'Please upload an image!' }]}
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
						src={track?.imageUrl}
					/>
				</div>
				<Form.Item
					label="Audio"
					name="audio"
					rules={[{ required: !trackId ? true : false, message: 'Please upload an audio!' }]}
				>
					<Upload
						name="audio"
						listType="picture-card"
						maxCount={1}
						showUploadList={true}
					>
						Upload Audio
					</Upload>
				</Form.Item>
				<div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 15 }}>
					<b>Audio: </b>{track?.audioUrl}
				</div>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='text' style={{ marginRight: 20 }}>
						<Link to={'/admin/tracks'}>
							<ArrowLeftOutlined /> Back to tracks
						</Link>
					</Button>
					<Button type="primary" htmlType="submit">
						{trackId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}