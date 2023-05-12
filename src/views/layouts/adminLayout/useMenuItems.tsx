import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export function useMenuItems() {
	const navigate = useNavigate()
	return [
		{
			label: 'Home',
			key: 'home',
			icon: <MailOutlined />,
			onClick: () => navigate('/admin/home')
		},
		{
			label: 'Users',
			key: 'users',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/users')
		},
		{
			label: 'Tracks',
			key: 'tracks',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/tracks')
		},
		{
			label: 'Playlists',
			key: 'playlists',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/playlists')
		},
		{
			label: 'Albums',
			key: 'albums',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/albums')
		},
		{
			label: 'Artists',
			key: 'artists',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/artists')
		},
		{
			label: 'Genres',
			key: 'genres',
			icon: <AppstoreOutlined />,
			onClick: () => navigate('/admin/genres/')
		},
	]
}