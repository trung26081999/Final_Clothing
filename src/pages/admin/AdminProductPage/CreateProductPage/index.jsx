import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import slug from "slug";

import {
  Button,
  Select,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ROUTES } from "../../../../constants/routes";
import {
  createProductAction,
  getCategoriesListAction,
} from "../../../../redux/actions";

import * as S from "./styles";

const { Option } = Select;

const CreateProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createProductData } = useSelector((state) => state.product);

  const [createForm] = Form.useForm();
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getCategoriesListAction({
        params: {
          page: 1,
          limit: 999,
        },
      })
    );

    document.title = "Thêm sản phẩm";
  }, []);

  const renderCategoryOptions = () => {
    return categoryList.data.map((item) => {
      return (
        <Option key={item.id} values={item.id}>
          {item.name}
        </Option>
      );
    });
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateProduct = async (data) => {
    const { images, ...productData } = data;
    const newImages = [];
    const finalPrice = data.price * (1 - data.discountPercent / 100);

    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        url: imgBase64,
        thumbUrl: images[i].thumbUrl,
      });
    }

    await dispatch(
      createProductAction({
        data: {
          ...productData,
          isHidden: productData.isHidden || false,
          isNew: productData.isNew || false,
          categoryId: parseInt(data.categoryId),
          slug: slug(data.name),
          finalPrice: finalPrice,
        },
        images: newImages,
        callback: {
          goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST_PAGE),
        },
      })
    );
  };

  return (
    <S.CreateProductFormWrapper>
      <S.TopWrapper>
        <h3>Tạo sản phẩm mới</h3>

        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={createProductData.loading}
            onClick={() => createForm.submit()}
          >
            Tạo sản phẩm mới
          </Button>

          <Button
            color="#000"
            // type="danger"
            onClick={() => navigate(ROUTES.ADMIN.PRODUCT_LIST_PAGE)}
          >
            Hủy
          </Button>
        </Space>
      </S.TopWrapper>

      <Form
        form={createForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        style={{ padding: "12px 0" }}
        autoComplete="off"
        onFinish={(values) => {
          handleCreateProduct(values);
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
          rules={[{ required: true, message: "Hãy chọn sản phẩm" }]}
        >
          <Select
            showSearch
            placeholder="Chọn sản phẩm"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {renderCategoryOptions()}
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
          <Select placeholder="Chọn size">
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
          <Select placeholder="Chọn màu">
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
          name={["images"]}
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
        
          <Upload listType="picture-card"  beforeUpload={Upload.LIST_IGNORE}>
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
            onChange={(value) => createForm.setFieldsValue({ content: value })}
          />
        </Form.Item>
      </Form>
    </S.CreateProductFormWrapper>
  );
};

export default CreateProductPage;
