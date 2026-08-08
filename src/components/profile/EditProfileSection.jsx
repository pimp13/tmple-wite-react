import { useId, useState } from "react";
import { FancyInput } from "../ui/Input";

export const EditProfileSecttion = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    sex: "",
    about: "",
  });

  const handleChangeInputsForm = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FancyInput
            label="نام"
            name="firstName"
            // icon={Mail}
            onChange={handleChangeInputsForm}
            // error={errors.email}
            // success={!errors.email && form.email.length > 0}
            required
          />
        </div>
        <div>
          <FancyInput
            label="نام خانوادگی"
            name="lastName"
            // icon={Mail}
            onChange={handleChangeInputsForm}
            // error={errors.email}
            // success={!errors.email && form.email.length > 0}
            required
          />
        </div>
      </div>
    </div>
  );
};
