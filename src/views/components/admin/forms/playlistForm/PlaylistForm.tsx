import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Image, Input, Select, Upload, message } from 'antd'
import type { SelectProps } from 'antd';
import TrackAdminContext from 'context/admin/track.context/TrackAdminContext'
import PlaylistAdminContext from 'context/admin/playlist.context/PlaylistAdminContext'

export default function PlaylistForm() {
	const { playlistId } = useParams()
	const { playlists, postPlaylist, updatePlaylist } = useContext(PlaylistAdminContext)
	const { tracks } = useContext(TrackAdminContext)
	const [messageApi, contextHolder] = message.useMessage()
	const playlist: any = playlists.find((playlist: any) => playlist._id === playlistId)

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
			<h1 style={{ textAlign: 'center' }}>{playlistId ? 'Update' : 'Create'} Playlist</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 12 }}
				style={{ maxWidth: 600, margin: '0 auto' }}
				initialValues={{ remember: true }}
				onFinish={(values) => !playlistId ? postPlaylist(values, messageApi) : updatePlaylist(values, playlist, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: !playlistId ? true : false, message: 'Please input playlist name!' }]}
				>
					<Input placeholder='Introduce track name' defaultValue={playlist?.name} />
				</Form.Item>

				<Form.Item
					label="description"
					name="description"
					// rules={[{ required: !playlistId ? true : false, message: 'Please input playlist name!' }]}
				>
					<Input placeholder='Introduce playlist name' defaultValue={playlist?.name} />
				</Form.Item>

				<Form.Item
					label="Tracks"
					name="tracks"
					rules={[{ required: !playlistId ? true : false, message: 'Please input playlist tracks!' }]}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select tracks"
						defaultValue={playlist?.tracks}
						options={trackOptions}
						optionFilterProp='label'
					/>
				</Form.Item>

				<Form.Item
					label="Image"
					name="image"
					rules={[{ required: !playlistId ? true : false, message: 'Please upload an image!' }]}
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
						src={playlist?.imageUrl}
					/>
				</div>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='text' style={{ marginRight: 20 }}>
						<Link to={'/admin/playlists'}>
							<ArrowLeftOutlined /> Back to playlists
						</Link>
					</Button>
					<Button type="primary" htmlType="submit">
						{playlistId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}