import { useRef, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, generatePath } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Keyboard,
} from "swiper";
import { ROUTES } from "../../../constants/routes";
import {
  getProductListUserAction,
  removeProductDetailAction,
} from "../../../redux/actions";
import bannerImg from "../../../assets/banner/bgr-img.jpg";
import HomeProductList from "./ProductSections/HomeProductList";

import bgrImage from "../../../assets/banner/BANNER.jpg";

import * as S from "./style";
import { Col, Input, Row, Spin } from "antd";

const HomePage = () => {
  window.title = "asdf";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productListUser } = useSelector((state) => state.product);

  const newProducts = productListUser.data?.filter(
    (item) => item.isNew === true
  );

  const shuffled = newProducts.sort(() => 0.5 - Math.random());
  const selectedNewProducts = shuffled.slice(0, 8);
  const videoRef = useRef();

  window.scrollTo({
    top: 0,
  });

  useEffect(() => {
    dispatch(
      getProductListUserAction({
        params: {
          page: 1,
          limit: 999,
        },
      })
    );

    document.title = "Trang chủ";

    return () => {
      dispatch(removeProductDetailAction());
    };
  }, []);

  const scrollToProduct = () => {
    window.scrollTo({
      top: videoRef.current.clientHeight,
      behavior: "smooth",
    });
  };

  const renderNewProducts = useMemo(() => {
    return selectedNewProducts?.map((item) => {
      return (
        <SwiperSlide key={item.id}>
          <Col xxl={24} xl={24} md={24} sm={24} xs={24}>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${item.slug}.${item.id}`,
              })}
            >
              <S.Product>
                <div className="newProduct__image">
                  <img src={item.images[0].url} alt="product" />
                </div>
                <h2>{item.name}</h2>

                <div className="new_product-label">
                  <span>Mới</span>
                </div>
              </S.Product>
            </Link>
          </Col>
        </SwiperSlide>
      );
    });
  }, [productListUser.data]);

  if (productListUser.loading)
    return (
      <Spin spinning={true}>
        <div
          style={{
            minHeight: "100vh",
          }}
        ></div>
      </Spin>
    );

  return (
    <S.HomePageWrapper>
      <div className="top__spacer"></div>
      <div className="header_img-wrapper">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          autoplay={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://360boutique.vn/wp-content/uploads/2022/11/Cover-WEB.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://360boutique.vn/wp-content/uploads/2022/11/Banner-web-BST-No-more.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://360boutique.vn/wp-content/uploads/2022/09/Banner-web.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://360boutique.vn/wp-content/uploads/2022/11/BANNER-WEB-01.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <section className="policy__section">
        <Row>
          <Col span={8}>
            <div className="policy__section-img">
              <img
                alt=""
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/mall/6c502a2641457578b0d5f5153b53dd5d.png"
              />
            </div>

            <div className="policy__section-content">
              <h4>7 ngày miễn phí trả hàng</h4>
              <p>Trả hàng miễn phí trong 7 ngày</p>
            </div>
          </Col>
          <Col span={8}>
            <div className="policy__section-img">
              <img
                alt=""
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/mall/511aca04cc3ba9234ab0e4fcf20768a2.png"
              />
            </div>
            <div className="policy__section-content">
              <h4>Hàng chính hãng 100%</h4>
              <p>Đảm bảo hàng chính hãng hoặc hoàn tiền gấp đôi</p>
            </div>
          </Col>
          <Col span={8}>
            <div className="policy__section-img">
              <img
                alt=""
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/mall/16ead7e0a68c3cff9f32910e4be08122.png"
              />
            </div>
            <div className="policy__section-content">
              <h4>Miễn phí vận chuyển</h4>
              <p>Giao hàng miễn phí toàn quốc</p>
            </div>
          </Col>
        </Row>
      </section>

      <section className="new_products-section">
        <h3 className="new_products_section-heading">Sản phẩm mới</h3>

        {/* <Slider ref={sliderRef} {...settings}>
          {renderNewProducts}
        </Slider> */}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          pagination={{ clickable: true }}
          navigation
          autoplay={true}
          loop={true}
          breakpoints={{
            1: {
              slidesPerView: 2,
            },
            576: {
              slidesPerView: 3,
            },
            998: {
              slidesPerView: 4,
            },
          }}
        >
          {renderNewProducts}
        </Swiper>

        <div className="new_products-list"></div>
      </section>

      <section className="men_products-section">
        <div className="men_products-banner-img">
          <img
            alt=""
            src="https://bizweb.sapocdn.net/thumb/grande/100/438/408/themes/888513/assets/link_image_3_1.jpg?1670749228834"
          />
          <h3 className="product_banner-title">ĐỒ NAM</h3>
          <Link
            className="product_banner-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate({
                pathname: ROUTES.USER.MEN_DETAIL,
                search: "?gender=male",
              });
            }}
          >
            KHÁM PHÁ THÊM
          </Link>
        </div>

        <div className="men_products-list">
          <HomeProductList gender="male" />
        </div>
      </section>

      <S.EmailRegister bgrImage={bgrImage}>
        <div className="email_register-inner">
          <div className="email_register-content">
            <h3>Đăng ký nhận bản tin</h3>
            <p>
              Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và
              thông tin giảm giá khác.
            </p>
            <form className="email_register-form">
              <Input placeholder="Nhập email muốn đăng ký..." />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </S.EmailRegister>

      <section className="women_products-section">
        <div className="women_products-banner-img">
          <img
            alt=""
            src="https://bizweb.sapocdn.net/thumb/grande/100/438/408/themes/888513/assets/link_image_2_1.jpg?1670749228834"
          />
          <h3 className="product_banner-title">ĐỒ NỮ</h3>
          <Link
            className="product_banner-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate({
                pathname: ROUTES.USER.MEN_DETAIL,
                search: "?gender=female",
              });
            }}
          >
            KHÁM PHÁ THÊM
          </Link>
        </div>

        <div className="women_products-list">
          {" "}
          <HomeProductList gender="female" />
        </div>
      </section>

      <section className="instagram__follow-section">
        <div className="follow__section-title">
          <h3>Theo dõi chúng tôi trên Instagram</h3>
        </div>

        <div className="follow__section-name">
          <p>clothingstore@instagram</p>
        </div>

        <div className="follow__section-image-list">
          <Col xxl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="follow__section-image">
              <img
                alt=""
                src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/qjn4064-xdm5.jpg?v=1665374265000"
              />
            </div>
          </Col>
          <Col xxl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="follow__section-image">
              <img
                alt=""
                src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/qjm4013-xah-3.jpg?v=1665194437000"
              />
            </div>
          </Col>

          <Col xxl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="follow__section-image">
              <img
                alt=""
                src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/qjm4013-xah-3.jpg?v=1665194437000"
              />
            </div>
          </Col>

          <Col xxl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="follow__section-image">
              <img
                alt=""
                src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/sdm5057-cam-3-03271db8-bc2c-4acb-878b-1bcf252a5685-f39f7be8-b2c3-4e32-9ad2-ba9b8dcc1cae.jpg?v=1669773678000"
              />
            </div>
          </Col>

          <Col xxl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="follow__section-image">
              <img
                alt=""
                src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/sdm5003-nav-2.jpg?v=1666664152000"
              />
            </div>
          </Col>

          <Col xxl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="follow__section-image">
              <img
                alt=""
                src="https://bizweb.sapocdn.net/thumb/large/100/438/408/products/phn5000-tit-6-e6ad4b46-9fc9-4b1c-96cb-e4eb7a48c5a1.jpg?v=1668052431000"
              />
            </div>
          </Col>
        </div>
      </section>
    </S.HomePageWrapper>
  );
};

export default HomePage;
