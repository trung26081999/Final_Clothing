import * as S from "./styles";
import { Breadcrumb, Col, Image, Row } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  WhatsAppOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import GoogleMapReact from "google-map-react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_robi4jj",
        "template_6888rvs",
        form.current,
        "lrtvqnDX5k_EjCPaS"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const defaultProps = {
    center: {
      lat: 21.027763,
      lng: 105.83416,
    },
    zoom: 8,
  };

  return (
    <S.ContactPageWrapper>
      <S.BreadcrumbWrapper>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p>Liên hệ</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </S.BreadcrumbWrapper>
      <Row className="contact-container">
        <Col xl={15} lg={12} className="contact-container-left">
          <Image
            width="100%"
            height="100%"
            src="https://360boutique.vn/wp-content/uploads/2021/11/40cfed33ec5e27007e4f-2048x1372.jpg"
          />
        </Col>
        <Col xl={8} lg={11} className="contact-container-right">
          <div className="contact-title">
            <span>
              <WhatsAppOutlined />
            </span>{" "}
            Liên hệ với chúng tôi
          </div>
          <div className="contact-item">
            <p style={{ fontSize: 23, fontWeight: 700, marginBottom: 0 }}>
              <span>
                <MailOutlined />
              </span>{" "}
              Email
            </p>
            <p className="contact-text-list-item ">
              Yêu cầu sản phẩm : clothingstore@gmail.com
            </p>
            <p className="contact-text-list-item ">
              Vận chuyển & hỗ trợ : clothingstore@gmail.com
            </p>
            <p className="contact-text-list-item ">
              Hỗ trợ kỹ thuật : clothingstore@gmail.com
            </p>
            <p className="contact-text-list-item ">
              Quảng cáo : clothingstore@gmail.com
            </p>
          </div>
          <div className="contact-item">
            <p style={{ fontSize: 23, fontWeight: 700, marginBottom: 0 }}>
              <span>
                <GlobalOutlined />
              </span>{" "}
              Phương tiện truyền thông
            </p>
            <S.LinkFooter href="/Instagram">
              <span>
                <InstagramOutlined />
              </span>{" "}
              Instagram
            </S.LinkFooter>
            <S.LinkFooter href="/Facebook">
              <span>
                <FacebookOutlined />
              </span>{" "}
              Facebook
            </S.LinkFooter>
            <S.LinkFooter href="/YouTube">
              <span>
                <YoutubeOutlined />
              </span>{" "}
              YouTube
            </S.LinkFooter>
          </div>
          <div className="contact-item">
            <StyledContactForm>
              <h3>Liên hệ đến</h3>
              <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
              </form>
            </StyledContactForm>
            <p style={{ fontSize: 23, fontWeight: 700, marginBottom: 0 }}>
              <span>
                <EnvironmentOutlined />
              </span>{" "}
              Địa chỉ liên hệ
            </p>
            <div style={{ height: "30vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={21.027763}
                  lng={105.83416}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
            <p className="contact-text-list-item ">Thành phố Đà Nẵng</p>
            <p className="contact-text-list-item ">Điện thoại: 012 345 6789</p>
          </div>
        </Col>
      </Row>
      <S.InfoWrapper>
        <div className="info-container-contact">
          <h2>TẠI SAO NÊN MUA HÀNG TẠI Clothing Store ?</h2>
          <p>
            Chúng tôi cam kết mang lại những giá trị cao nhất cho khách hàng khi
            đến với Clothing Store
          </p>
        </div>
        <div className="item-wrapper-contact">
          <Row className="item-container-contact" gutter={[16, 16]}>
            <Col
              xl={7}
              lg={7}
              md={9}
              sm={11}
              xs={20}
              className="item-content-contact"
            >
              <div>
                <img
                  src="https://cdn3.dhht.vn/wp-content/uploads/2018/09/1.png"
                  alt=""
                />
                <h3>MẪU MÃ ĐẸP HÀNG ĐẦU</h3>
              </div>
              <p>
                Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy
                nghĩ hành động của mình” là sứ mệnh, là triết lý, chiến lược..
              </p>
            </Col>
            <Col
              xl={7}
              lg={7}
              md={9}
              sm={11}
              xs={20}
              className="item-content-contact"
            >
              <div>
                <img
                  src="https://cdn3.dhht.vn/wp-content/uploads/2018/09/3.png"
                  alt=""
                />
                <h3>HẬU MÃI HÀNG ĐẦU</h3>
              </div>
              <p>
                Luôn đặt sự hài lòng của khách hàng là ưu tiên số 1, sản phẩm
                của Clothing-store được cải tiến không ngừng, nỗ lực đem lại cho
                quý khách những trải nghiệm tốt nhất. Đặc biệt, Clothing-store
                đã phát triển những chất liệu độc quyền thân thiện với môi
                trường và đang là xu hướng thời trang bền vững như vải cafe khử
                mùi, Pique mắt chim, Coolmax hay vải Pima cao cấp.
              </p>
            </Col>

            <Col
              xl={7}
              lg={7}
              md={9}
              sm={11}
              xs={20}
              className="item-content-contact"
            >
              <div>
                <img
                  src="https://cdn3.dhht.vn/wp-content/uploads/2018/09/4.png"
                  alt=""
                />
                <h3>THANH TOÁN DỄ DÀNG</h3>
              </div>
              <p>
                Bạn chỉ phải trả tiền khi đã nhận được hàng! Ngay Tại Nhà Bạn!
                Chuyển khoản trực tiếp (Cho những bạn muốn gửi quà cho bạn bè,
                người thân)
              </p>
            </Col>
          </Row>
        </div>
      </S.InfoWrapper>
    </S.ContactPageWrapper>
  );
};

export default ContactPage;
const StyledContactForm = styled.div`
  width: 400px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    label {
      margin-top: 1rem;
    }
    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
