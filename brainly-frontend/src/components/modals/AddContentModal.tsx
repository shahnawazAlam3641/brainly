import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../Button";

interface propsData {
  handleAddContent: (data: FieldValues) => void;
  setAddModal: (data: boolean) => void;
}

const AddContentModal = (props: propsData) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAddContent, setAddModal } = props;

  return (
    <div className="absolute p-6  rounded-md z-30  top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white shadow-black shadow-2xl">
      <div className="relative">
        <form
          className="flex flex-col justify-center items-center  gap-4 p-5"
          onSubmit={handleSubmit((data) => handleAddContent(data))}
        >
          <input
            className="border border-purple-200 border-solid  py-2 px-4  rounded-md"
            placeholder="Title"
            type="text"
            {...register("Title", { required: true, minLength: 3 })}
          />
          {errors.Title && (
            <p className="text-red-300">Title must be atleat of 3 Character</p>
          )}

          <input
            className="border border-purple-200 border-solid py-2 px-4  rounded-md"
            placeholder="Link"
            type="text"
            {...register("Link", { required: true })}
          />
          {errors.Link && <p className="text-red-300">Link is required.</p>}

          <select
            className=" border border-purple-200 border-solid  py-2 px-4  rounded-md w-full"
            {...register("Type", { required: true })}
          >
            <option>Twitter(X)</option>
            <option>Youtube</option>
            <option>Document</option>
            <option>Link</option>
          </select>

          <input
            className="border border-purple-200 border-solid py-2 px-4  rounded-md"
            placeholder="Enter Tag - Comma (,) seperated"
            type="text"
            {...register("Tag", { required: false })}
          />

          <div className="flex">
            <Button isPrimary={true} text={"Add Note"} />
          </div>
        </form>

        <p
          onClick={() => setAddModal(false)}
          className="text-slate-700 cursor-pointer absolute -top-5 -right-3 text-xl"
        >
          X
        </p>
      </div>
    </div>
  );
};

export default AddContentModal;
