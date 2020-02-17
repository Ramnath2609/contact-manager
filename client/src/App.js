import React from 'react'
import WrappedLoginForm from './components/user/Login'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Menu, PageHeader, Icon } from 'antd';

import WrappedRegistrationForm from './components/user/Register'
import List from './components/contacts/List'
import New from './components/contacts/New'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu

function App () {
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href = "/login"
    }
    return (
        <BrowserRouter>
            <div>
            <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)',
                }}
                title="My Contacts"
            />
            { localStorage.getItem('authToken') ? (
                <div>
                    <Menu mode="horizontal" theme="dark">
                        <Menu.Item key="mail">
                            <Link to ="/">Home</Link> 
                        </Menu.Item>
                        {/* <Menu.Item key="app">
                            <Link to = "/contacts">Contacts</Link>
                        </Menu.Item> */}
                          <SubMenu
                            title={
                                <span className="submenu-title-wrapper">
                                Contacts
                                </span>
                            }
                            >
                                <Menu.Item key="setting:1">
                                    <Link to = "/contacts">All contacts</Link>
                                </Menu.Item>
                                <Menu.Item key="setting:2">
                                    <Link to = "/contacts/new">New contact</Link>
                                </Menu.Item>
                            </SubMenu>
                        <Menu.Item key="alipay">
                            <Link to ="/logout" onClick = { handleLogout }>Logout</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            ) : (
                <div>
                     <Menu mode="horizontal" theme="light">
                        <Menu.Item key="mail">
                            <Link to ="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="app">
                            <Link to = "/register">Register</Link>
                        </Menu.Item>
                        <Menu.Item key="alipay">
                            <Link to ="/login">Login</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            )}
                
            </div>

            <Switch>
                <Route path = "/login" component = { WrappedLoginForm } />
                <Route path = "/register" component = { WrappedRegistrationForm } />
                <Route exact path = "/contacts" component = { List } />
                <Route path = "/contacts/new" component = { New } />
            </Switch>
        </BrowserRouter>
    );
}


export default App