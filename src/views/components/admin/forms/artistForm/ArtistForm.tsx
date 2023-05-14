import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Form, Image, Input, Select, Upload, message } from 'antd'
import GenreAdminContext from 'context/admin/genre.context/GenreAdminContext'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ArtistAdminContext from 'context/admin/artist.context/ArtistAdminContext'
import type { SelectProps } from 'antd';

export default function ArtistForm() {
	const { artistId } = useParams()
	const { artists, postArtist, updateArtist } = useContext(ArtistAdminContext)
	const { genres } = useContext(GenreAdminContext)
	const [messageApi, contextHolder] = message.useMessage()
	const findArtist: any = artists.find((artist: any) => artist._id === artistId)

	const options: SelectProps['options'] = [];
	genres.forEach((genre: any) => {
		options.push({
			label: genre.name,
			value: genre._id,
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
					rules={[{ required: !artistId ? true : false, message: 'Please input artist genres!' }]}
				>
					<Select
						mode="multiple"
						allowClear
						style={{ width: '100%' }}
						placeholder="Select genres"
						defaultValue={findArtist?.genres}
						options={options}
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