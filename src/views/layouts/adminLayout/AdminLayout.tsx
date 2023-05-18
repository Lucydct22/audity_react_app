import { useContext, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import GenreAdminProvider from 'context/admin/genre.context/GenreAdminProvider'
import ArtistAdminProvider from 'context/admin/artist.context/ArtistAdminProvider'
import AlbumAdminProvider from 'context/admin/album.context/AlbumAdminProvider'
import TrackAdminProvider from 'context/admin/track.context/TrackAdminProvider'
import UserContext from 'context/user/UserContext'
import PlaylistAdminProvider from 'context/admin/playlist.context/PlaylistAdminProvider'
import UserAdminProvider from 'context/admin/user.context/UserAdminProvider'
import StatisticAdminProvider from 'context/admin/statistic.context/StatiticAdminProvider'
import { useMenuItems } from './useMenuItems'
import Spinner from 'views/UI/spinner/Spinner'
import { Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import './adminLayout.scss'
const { Header, Footer, Content } = Layout;

const AdminLayout = () => {
  const { dbUser } = useContext(UserContext)
  const { user, isLoading } = useAuth0()
  const navigate = useNavigate()
  const menuItems = useMenuItems()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !user) {
      return navigate("/");
    }
  }, [user]);

  return (
    dbUser.role === 'admin' ? (
      <GenreAdminProvider>
        <ArtistAdminProvider>
          <AlbumAdminProvider>
            <TrackAdminProvider>
              <PlaylistAdminProvider>
                <UserAdminProvider>
                  <StatisticAdminProvider>
                    <Layout className="layout-admin">
                      <Header className="layout-admin__header">
                        <div className="layout-admin__header--logo">
                          Admin
                        </div>
                        <Menu
                          theme="dark"
                          mode="horizontal"
                          items={menuItems}
                          className="layout-admin__header--menu"
                          defaultSelectedKeys={[location.pathname]}
                        />
                        <Link to={'/'} className="layout-admin__header--exit">
                          <LogoutOutlined />
                        </Link>
                      </Header>
                      <Content className="layout-admin__content">
                        <Outlet />
                      </Content>
                      <Footer className="layout-admin__footer">
                        Audity Music ©2023
                      </Footer>
                    </Layout>
                  </StatisticAdminProvider>
                </UserAdminProvider>
              </PlaylistAdminProvider>
            </TrackAdminProvider>
          </AlbumAdminProvider>
        </ArtistAdminProvider>
      </GenreAdminProvider>
    ) : (
      <Spinner />
    )
  )
}

export default AdminLayout;