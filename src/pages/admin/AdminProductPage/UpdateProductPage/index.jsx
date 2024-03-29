import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import slug from "slug";

import {
  Button,
  Select,
  Form,
  Input,
  InputNumber,
  Upload,
  Space,
  Spin,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ROUTES } from "../../../../constants/routes";
import {
  updateProductAction,
  getCategoriesListAction,
  getProductDetailAction,
  removeProductDetailAction,
} from "../../../../redux/actions";
import {
  convertBase64ToImage,
  convertImageToBase64,
} from "../../../../utils/function/files";

import * as S from "./styles";

const { Option } = Select;

const UpdateProductPage = () => {
  const { id } = useParams();
  const [updateForm] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { updateProductData, productDetail } = useSelector(
    (state) => state.product
  );
  const { categoryList } = useSelector((state) => state.category);

  const initialValue = {
    ...productDetail.data,
  };

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));

    dispatch(
      getCategoriesListAction({
        params: {
          page: 1,
          limit: 999,
        },
      })
    );

    document.title = "Chỉnh sửa sản phẩm";

    return () => {
      dispatch(removeProductDetailAction());
    };
  }, [id]);

  useEffect(() => {
    if (productDetail.data.id) {
      updateForm.resetFields();
      setImagesField(productDetail.data.images);
    }
  }, [productDetail.data]);

  const setImagesField = async (images) => {
    const newImage = [];

    for (let i = 0; i < images.length; i++) {
      const imageFile = await convertBase64ToImage(
        images[i].url,
        images[i].name,
        images[i].type
      );
      await newImage.push({
        id: images[i].id,
        lastModified: imageFile.lastModified,
        lastModifiedDate: imageFile.lastModifiedDate,
        name: imageFile.name,
        type: imageFile.type,
        originFileObj: imageFile,
        thumbUrl: images[i].thumbUrl,
      });
    }

    await updateForm.setFieldValue("images", newImage);
  };

  const handleUpdateProduct = async (data) => {
    const { images, ...productData } = data;
    const finalPrice = data.price * (1 - data.discountPercent / 100);
    let isDiscount = false;
    if (data.discountPercent > 0) isDiscount = true;
    const newImages = [];

    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        ...(images[i].id && { id: images[i].id }),
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }

    console.log(newImages);

    await dispatch(
      updateProductAction({
        data: {
          ...productData,
          isHidden: productData.isHidden || false,
          isNew: productData.isNew || false,
          categoryId: parseInt(data.categoryId),
          slug: slug(data.name),
          finalPrice: finalPrice,
          isDiscount: isDiscount,
        },
        id: id,
        images: newImages,
        initialImageIds: productDetail.data.images.map((item) => item.id),
        callback: {
          goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST_PAGE),
        },
      })
    );
  };

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  return (
    <S.CreateProductFormWrapper>
      <S.UpdateProductActions>
        <h3>Sửa thông tin sản phẩm</h3>

        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateProductData.loading}
            onClick={() => updateForm.submit()}
          >
            Cập nhật
          </Button>

          <Button
            // type="danger"
            color="#000"
            onClick={() => navigate(ROUTES.ADMIN.PRODUCT_LIST_PAGE)}
          >
            Hủy
          </Button>
        </Space>
      </S.UpdateProductActions>

      <Spin spinning={productDetail.loading}>
        <Form
          form={updateForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          style={{ padding: "12px 0" }}
          autoComplete="off"
          initialValues={initialValue}
          onFinish={(values) => {
            handleUpdateProduct(values);
          }}
        >
          <Form.Item
            label="Tạm ẩn sản phẩm"
            name="isHidden"
            valuePropName="checked"
          >
            <Checkbox defaultChecked={false} />
          </Form.Item>

          <Form.Item label="Sản phẩm mới" name="isNew" valuePropName="checked">
            <Checkbox defaultChecked={false} />
          </Form.Item>

          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sản phẩm"
            name="categoryId"
            rules={[{ required: true, message: "Hãy chọn hãng" }]}
          >
            <Select
              showSearch
              placeholder="Chọn hãng sản xuất"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {renderCategoryOptions}
            </Select>
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              { required: true, message: "Hãy chọn giới tính của sản phẩm" },
            ]}
          >
            <Select placeholder="Chọn giới tính">
              <Option value="male">Nam</Option>
              <Option value="female">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Hãy nhập giá sản phẩm" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            label="Tồn kho"
            name="stock"
            rules={[
              {
                required: true,
                message: "Hãy nhập số lượng sản phẩm trong kho",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Khuyến mãi(%)"
            name="discountPercent"
            initialValue={0}
            rules={[{ required: true, message: "Hãy nhập khuyến mãi" }]}
          >
            <InputNumber min={0} max={99} />
          </Form.Item>

          <Form.Item
            label="Size"
            name="caseSize"
            rules={[{ required: true, message: "Hãy nhập size" }]}
          >
            <Select  placeholder="Chọn size">
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
              <Option value="XXL">XXL</Option>
            </Select>
          </Form.Item>

       

          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[{ required: true, message: "Hãy nhập màu sản phẩm" }]}
          >
            <Select  placeholder="Chọn màu">
            <Option value="Red">Red</Option>
            <Option value="Gray">Gray</Option>
            <Option value="Green">Green</Option>
            <Option value="Pink">Pink</Option>
            <Option value="Purple">Purple</Option>
            <Option value="yellow">yellow</Option>
            <Option value="Black">Black</Option>
            <Option value="White">White</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ảnh sản phẩm"
            name="images"
            valuePropName="fileList"
            rules={[
              {
                required: true,
                message: "Hãy chọn ảnh sản phẩm",
              },
            ]}
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}
          >
            <Upload listType="picture-card" beforeUpload={Upload.LIST_IGNORE}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Chọn ảnh</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Nội dung mô tả"
            name="content"
            rules={[
              {
                required: true,
                message: "Hãy nhập nội dung giới thiệu sản phẩm",
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              onChange={(value) =>
                updateForm.setFieldsValue({ content: value })
              }
            />
          </Form.Item>
        </Form>
      </Spin>
    </S.CreateProductFormWrapper>
  );
};

export default UpdateProductPage;
