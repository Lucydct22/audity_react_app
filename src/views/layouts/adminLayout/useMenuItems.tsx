import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export function useMenuItems() {
	const navigate = useNavigate()
	return [
		{
			label: 'Home',
			key: '/admin/home',
			icon: <MailOutlined />,
			onClick: () => navigate('/admin/home')
		},
		{
			label: 'Users',
			key: '/admin/users',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/users')
		},
		{
			label: 'Tracks',
			key: '/admin/tracks',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/tracks')
		},
		{
			label: 'Playlists',
			key: '/admin/playlists',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/playlists')
		},
		{
			label: 'Albums',
			key: '/admin/albums',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/albums')
		},
		{
			label: 'Artists',
			key: '/admin/artists',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/artists')
		},
		{
			label: 'Genres',
			key: '/admin/genres/',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/genres/')
		},
	]
}