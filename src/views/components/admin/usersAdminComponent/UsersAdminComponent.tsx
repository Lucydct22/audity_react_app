import { useContext, useEffect, useState } from 'react'
import { Avatar, List, Skeleton, message, Popconfirm, Button, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import UserAdminContext from 'context/admin/user.context/UserAdminContext';

export default function UsersAdminComponent() {
	const { users, deleteUser, updateUserRole } = useContext(UserAdminContext)
	const [initLoading, setInitLoading] = useState(true);
	const [list, setList]: any = useState([]);
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		setInitLoading(false);
		setList(users);
	}, [users]);

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
								title="Delete the user"
								description="Are you sure to delete this user?"
								placement="bottom"
								onConfirm={() => deleteUser(item._id, messageApi)}
								okText="Remove"
								style={{ padding: '10px' }}
							>
								<Button className='delete-button' type="link" key="list-loadmore-remove" danger><DeleteOutlined /></Button>
							</Popconfirm>,
							<Select
								defaultValue={item.role}
								style={{ width: 90 }}
								allowClear
								options={[
									{ value: 'user', label: 'User' },
									{ value: 'admin', label: 'Admin' },
								]}
								onChange={(e) => updateUserRole(e, item._id, messageApi)}
							/>
						]}
					>
						<Skeleton avatar title={false} loading={item.loading} active>
							<List.Item.Meta
								avatar={<Avatar src={item.picture} />}
								title={<p style={{ paddingTop: 6 }}>{item.email}</p>}
							/>
							<div>
								Likes: {
									item.likesTo.albums.length +
									item.likesTo.artists.length +
									item.likesTo.playlists.length +
									item.likesTo.tracks.length
								}
							</div>
						</Skeleton>
					</List.Item>
				)}
			/>
		</>
	);
}