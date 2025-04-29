// ReviewForm.tsx
import React from "react";
import { Form, Input, Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/es/form";
import SideBar from "./sidebar";

interface ReviewFormProps {
  form?: FormInstance;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ form }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <SideBar title="Review" description="Manage product reviews" />

      <div className="w-full md:w-3/4">
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="flex flex-wrap items-center gap-2 mb-4"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "reviewerName"]}
                    className="flex-1 min-w-[150px] m-0"
                    rules={[
                      { required: true, message: "Reviewer name missing" },
                    ]}
                  >
                    <Input placeholder="Reviewer Name" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    className="w-[100px] m-0"
                    rules={[{ required: true, message: "Rating missing" }]}
                  >
                    <Input placeholder="Rating" type="number" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    className="flex-1 min-w-[200px] m-0"
                    rules={[{ required: true, message: "Comment missing" }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>

                  <div className="flex items-center h-full">
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => remove(name)}
                    />
                  </div>
                </div>
              ))}

              <Form.Item className=" flex justify-end">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="small"
                >
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
};

export default ReviewForm;
