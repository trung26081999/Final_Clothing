import styled from "styled-components";

export const ProductGiftWrapper = styled.div`
  margin-top: 12px;

  .product_gift-heading {
    display: inline-block;
    font-size: 16px;
    padding: 4px 8px;
    color: #fff;
    background-color: black;
  }
  .product_gift-list {
    list-style: none;
    padding: 8px;
    border-top: 2px solid black;
  }
  .product_gift-item {
    font-size: 16px;
    margin: 8px 0;

    i {
      color: var(--price-color);
      margin-right: 4px;
      font-size: 20px;
    }

    span {
      margin-left: 4px;
    }
  }
  .detail {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 15px 0 0;
    width: 100%;
    border-top: 1px solid #dde1ef;
    padding-top: 20px;
    .item {
      margin-top: 10px;
      max-width: 50%;
      width: 50%;
      display: flex;
      padding: 0 10px;
      border-radius: 2px;
      .content-item {
        display: block;
        padding: 11px 10px;
        padding-left: 70px;
        position: relative;
        line-height: 1.4;
        cursor: pointer;
        border: 1px solid #dde1ef;
        width: 100%;
        background: #f8f8f8;
        .left {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56px;
        }
        .right {
          .title-service {
            font-size: 20px;
            color: #11006f;
            font-weight: bold;
          }
          .service-sumary {
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
