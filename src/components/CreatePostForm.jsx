import { useState } from "react";
import useDataProvider from "../hooks/useDataProvider";
import { Input } from "./ui/Input";

export const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: null,
    userId: 0,
    isActive: true,
    thumb: "",
  });

  const { data, reload, loading, error } = useDataProvider({
    provider: "http://localhost:3000/posts",
    method: "POST",
    autoLoad: false, // نمی‌خوایم موقع mount اجرا بشه
    // headers: { Authorization: `Bearer ${token}` },
    onSuccess: (res) => {
      console.log("دوره با موفقیت ساخته شد", res);
      // مثلا ریدایرکت یا نمایش پیام موفقیت
    },
    onError: (err) => {
      console.error("خطا در ساخت دوره", err);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending request to backend...
      const finalData = {
        ...formData,
        categoryId: Number(categoryId),
        userId: Number(userId),
      };
      await reload({
        method: "POST",
        body: finalData,
      });
    } catch (err) {
      console.log("errr" + err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label htmlFor="title">Title: </label>
        <Input name="title" id="title" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="content">Content: </label>
        <Input name="content" id="content" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="categoryId">categoryId</label>
        <Input
          name="categoryId"
          type="number"
          id="categoryId"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="userId">userId: </label>
        <Input
          name="userId"
          type="number"
          id="userId"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="isActive">ISActive: </label>
        <input
          name="isActive"
          type="checkbox"
          id="isActive"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="thumb">image url: </label>
        <Input name="thumb" id="thumb" onChange={handleChange} />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
