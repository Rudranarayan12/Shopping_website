import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-3">
          <input
            type="text"
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline-blue active:scale-90"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
