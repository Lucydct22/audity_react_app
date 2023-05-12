import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Form, Input, Upload, message } from 'antd';
import GenreAdminContext from 'context/admin/genre.context/GenreAdminContext';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function GenreForm() {
	const { genreId } = useParams()
	const { postGenre } = useContext(GenreAdminContext)
	const [messageApi, contextHolder] = message.useMessage();

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
				onFinish={(values) => postGenre(values, messageApi)}
				onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
			>
				<Form.Item
					label="Genre Name"
					name="name"
					rules={[{ required: true, message: 'Please input genre name!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Genre Image"
					name="image"
					rules={[{ required: true, message: 'Please upload an image!' }]}
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

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='text' style={{ marginRight: 20 }}>
						<Link to={'/admin/genres'}>
							<ArrowLeftOutlined /> Back to genres
						</Link>
					</Button>
					<Button type="primary" htmlType="submit" onClick={() => postMessage}>
						{genreId ? 'Update' : 'Create'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}