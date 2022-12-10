import { Image, Layout, Typography } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import imageNavbar from "../assets/icons/TTLogo.png";
import "./Main.scss";

const MainLayout = (props) => {
  const { Content } = Layout;
  const { children } = props;
  const user = useSelector((state) => state.authReducer.user);
  return (
    <Layout>
      <div className="layout-container">
        <div className="navbar">
          <Image src={imageNavbar} height={40} preview={false}></Image>
        </div>
        <Content>{children}</Content>
      </div>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
