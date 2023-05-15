import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, List, Skeleton, Modal, FloatButton, message, Popconfirm, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import ArtistAdminContext from 'context/admin/artist.context/ArtistAdminContext';

export default function ArtistsAdminComponent() {
	const { artists, deleteArtist } = useContext(ArtistAdminContext)
	const [initLoading, setInitLoading] = useState(true);
	const [list, setList] = useState([]);
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		setInitLoading(false);
		setList(artists);
	}, [artists]);

	return (
		<>
			{contextHolder}
			<List
				loading={initLoading}
				itemLayout="horizontal"
				dataSource={list}
				style={{ maxWidth: 600, margin: '0 auto' }}
				renderItem={(item: any) => (
					<List.Item
						actions={[
							<Popconfirm
								title="Delete the task"
								description="Are you sure to delete this task?"
								placement="bottom"
								onConfirm={() => deleteArtist(item, messageApi)}
								okText="Remove"
								style={{ padding: '10px' }}
							>
								<Button className='delete-button' type="link" key="list-loadmore-remove" danger><DeleteOutlined /></Button>
							</Popconfirm>,
							<a key="list-loadmore-edit" onClick={() => navigate(`/admin/artist-form/${item._id}`)}>Edit</a>,
						]}
					>
						<Skeleton avatar title={false} loading={item.loading} active>
							<List.Item.Meta
								avatar={<Avatar src={item.imageUrl} />}
								title={<p>{item.name}</p>}
							// description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
							{/* <div>content</div> */}
						</Skeleton>
					</List.Item>
				)}
			/>
			<FloatButton
				icon={<PlusOutlined />}
				type="primary"
				onClick={() => navigate('/admin/artist-form')}
			/>
		</>
	);
}