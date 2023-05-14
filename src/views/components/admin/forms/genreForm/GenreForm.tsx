import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Form, Image, Input, Upload, message } from 'antd'
import GenreAdminContext from 'context/admin/genre.context/GenreAdminContext'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function GenreForm() {
	const { genreId } = useParams()
	const { genres, postGenre, updateGenre } = useContext(GenreAdminContext)
	const [messageApi, contextHolder] = message.useMessage()
	const findGenre: any = genres.find((genre: any) => genre._id === genreId)

	return (
		<div style={{ maxWidth: 600, margin: '0 auto' }} >
			{contextHolder}
			<h1 style={{ textAlign: 'center' }}>{genreId ? 'Update' : 'Create'} Genre</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 12 }}
				style={{ maxWidth: 600, margin: '0 auto' }}
				initialValues={{ remember: true }}
				onFinish={(values) => !genreId ? postGenre(values, messageApi) : updateGenre(values, findGenre, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: !genreId ? true : false, message: 'Please input genre name!' }]}
				>
					<Input defaultValue={findGenre?.name} />
				</Form.Item>

				<Form.Item
					label="Image"
					name="image"
					rules={[{ required: !genreId ? true : false, message: 'Please upload an image!' }]}
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
						src={findGenre?.imageUrl}
					/>
				</div>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='text' style={{ marginRight: 20 }}>
						<Link to={'/admin/genres'}>
							<ArrowLeftOutlined /> Back to genres
						</Link>
					</Button>
					<Button type="primary" htmlType="submit">
						{genreId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}