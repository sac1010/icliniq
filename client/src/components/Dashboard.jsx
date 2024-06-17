import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Create", "create", <PieChartOutlined />),
  getItem("Tasks", "tasks", <DesktopOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const {currentUser} = useAuth()
  console.log(currentUser)
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    navigate(`/${e.key}`);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["create"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "right",
            paddingRight: 10,
          }}
        >
          <Button onClick={() => setIsLogoutModalOpen(true)}>Logout</Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 560,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: 30,
            }}
          >
            <Outlet/>
          </div>
        </Content>
      </Layout>
      <Modal
        onCancel={() => setIsLogoutModalOpen(false)}
        onOk={async () => {
          await signOut(auth);
          navigate("/login");
        }}
        open={isLogoutModalOpen}
      >
        Are you sure, you want to logout?
      </Modal>
    </Layout>
  );
};
export default App;
