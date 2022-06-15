import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, newCategoriesState } from "../atoms";

interface IForm {
  newCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [newCategories, setNewCategories] = useRecoilState(newCategoriesState);
  const setCategory = useSetRecoilState(categoryState);

  const handleCategorySubmit = ({ newCategory }: IForm) => {
    setCategory(newCategory as any);
    setNewCategories((prev) => {
      return [...prev, newCategory];
    });
    setValue("newCategory", "");
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(newCategories));
  }, [newCategories]);

  return (
    <form onSubmit={handleSubmit(handleCategorySubmit)}>
      <input
        {...register("newCategory", {
          required: "Category name has to be as least 3 letters",
          minLength: 3,
        })}
        placeholder="New Category"
      />
      <button>Add category</button>
    </form>
  );
}

export default CreateCategory;
