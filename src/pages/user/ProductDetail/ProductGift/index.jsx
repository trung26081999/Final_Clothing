import * as S from "./styles";

const ProductGift = ({ discount }) => {
  return (
    <S.ProductGiftWrapper>
      <h3 className="product_gift-heading">Khuyến mãi</h3>
      <ul className="product_gift-list">
        {!!discount && (
          <li className="product_gift-item">
            <i className="fa-solid fa-gift"></i>
            <span>Giảm trực tiếp {discount}% vào giá bán</span>
          </li>
        )}
        <div className="detail">
          <div className="item">
            <div className="content-item">
              <div className="left">
                <img
                  src="	https://bizweb.sapocdn.net/100/438/408/themes/888513/assets/ser_1.png?1670840722480"
                  alt=""
                />
              </div>
              <div className="right">
                <div class="title-service">Miễn phí vận chuyển</div>
                <div class="service-sumary">
                  <span>FREESHIP</span> mọi đơn hàng &gt;498K
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="content-item">
              <div className="left">
                <img
                  src="	https://bizweb.sapocdn.net/100/438/408/themes/888513/assets/ser_2.png?1670840722480"
                  alt=""
                />
              </div>
              <div className="right">
                <div class="title-service">Đa dạng hình thức thanh toán</div>
                <div class="service-sumary">
                  <span>Momo, VNPay, COD</span>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="content-item">
              <div className="left">
                <img
                  src="	https://bizweb.sapocdn.net/100/438/408/themes/888513/assets/ser_3.png?1670840722480"
                  alt=""
                />
              </div>
              <div className="right">
                <div class="title-service">Giao hàng nhanh</div>
                <div class="service-sumary">
                  Chỉ từ <span>2-5 ngày</span>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="content-item">
              <div className="left">
                <img
                  src="	https://bizweb.sapocdn.net/100/438/408/themes/888513/assets/ser_4.png?1670840722480"
                  alt=""
                />
              </div>
              <div className="right">
                <div class="title-service">
                  Miễn phí <span>ĐỔI, TRẢ</span>
                </div>
                <div class="service-sumary">
                  Trong <span>15 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </S.ProductGiftWrapper>
  );
};

export default ProductGift;
