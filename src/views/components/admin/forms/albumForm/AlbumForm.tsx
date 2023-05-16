import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import GenreAdminContext from 'context/admin/genre.context/GenreAdminContext'
import AlbumAdminContext from 'context/admin/album.context/AlbumAdminContext'
import ArtistAdminContext from 'context/admin/artist.context/ArtistAdminContext'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Image, Input, Select, Upload, message } from 'antd'
import type { SelectProps } from 'antd';
import TrackAdminContext from 'context/admin/track.context/TrackAdminContext'

export default function AlbumForm() {
	const { albumId } = useParams()
	const { albums, postAlbum, updateAlbum } = useContext(AlbumAdminContext)
	const { genres } = useContext(GenreAdminContext)
	const { artists } = useContext(ArtistAdminContext)
	const { tracks } = useContext(TrackAdminContext)
	const [messageApi, contextHolder] = message.useMessage()
	const album: any = albums.find((album: any) => album._id === albumId)

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

	const trackOptions: SelectProps['options'] = [];
	tracks.forEach((track: any) => {
		trackOptions.push({
			label: track.name,
			value: track._id,
		});
	});

	return (
		<div style={{ maxWidth: 600, margin: '0 auto' }} >
			{contextHolder}
			<h1 style={{ textAlign: 'center' }}>{albumId ? 'Update' : 'Create'} Album</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 12 }}
				style={{ maxWidth: 600, margin: '0 auto' }}
				initialValues={{ remember: true }}
				onFinish={(values) => !albumId ? postAlbum(values, messageApi) : updateAlbum(values, album, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: !albumId ? true : false, message: 'Please input album name!' }]}
				>
					<Input placeholder='Introduce album name' defaultValue={album?.name} />
				</Form.Item>

				<Form.Item
					label="Genres"
					name="genres"
					rules={[{ required: !albumId ? true : false, message: 'Please input album genres!' }]}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select genres"
						defaultValue={album?.genres}
						options={genreOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Artists"
					name="artists"
					rules={[{ required: !albumId ? true : false, message: 'Please input artists genres!' }]}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select artists"
						defaultValue={album?.artists}
						options={artistOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Tracks"
					name="tracks"
					rules={[{ required: !albumId ? true : false, message: 'Please input tracks genres!' }]}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select tracks"
						defaultValue={album?.tracks}
						options={trackOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Image"
					name="image"
					rules={[{ required: !albumId ? true : false, message: 'Please upload an image!' }]}
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
						src={album?.imageUrl}
					/>
				</div>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='text' style={{ marginRight: 20 }}>
						<Link to={'/admin/albums'}>
							<ArrowLeftOutlined /> Back to albums
						</Link>
					</Button>
					<Button type="primary" htmlType="submit">
						{albumId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}