import React from 'react';
import { TomSelect, Notification } from "@/base-components";
import { useState } from "react";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../redux/actions/product';

function Main() {
  const dispatch = useDispatch();

  const [notification, setNotification] = useState("Product created successfylly");
  const dropzoneMultipleRef = React.useRef();
  const [file, selectFile] = React.useState();

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = React.useState([]);
  
  const [formData, setFormData] = React.useState({
    productName: "",
    price: "",
    description: "",
    activeStatus: false,    
  });

  const elDropzoneMultipleRef = dropzoneMultipleRef.current;

  elDropzoneMultipleRef?.dropzone?.on("success", () => {
    alert("Added file.");
  });
  
  elDropzoneMultipleRef?.dropzone?.on("error", () => {
    alert("No more files please!");
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === 'activeStatus') return setFormData((prev) => ({...prev, [name]: e.target.checked}))

    setFormData((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = () => {
    const allData = {
      ...formData,
      price: String(formData.price),
      availableQuantity: String(formData.availableQuantity),
      categories: [...categories],
      images: [file],
      availableSizes: [...sizes]
    };
    if(allData.productName && allData.price) {
      dispatch(createProduct(allData, createNotification, setNotification));
    }
  }

  const createNotification = React.useRef();

  return (
    <>
      <Notification getRef={(el)=> {
          createNotification.current = el;
        }}
          options={{ duration: 3000 }}
          className="flex flex-col sm:flex-row"
        >
        <div className="font-medium">
            {notification}
        </div>
      </Notification>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Form Layout</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Layout */}
          <div className="p-5 intro-y box">
            <div>
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                onChange={handleChange}
                name="productName"
                type="text"
                className="w-full form-control"
                placeholder="Input text"
                value={formData.productName}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="productName" className="form-label">
                Product Price
              </label>
              <input
                value={formData.price}
                onChange={handleChange}
                name="price"
                type='number'
                className="w-full form-control"
                placeholder="Input text"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="productName" className="form-label">
                Available Quantity
              </label>
              <input
                value={formData.availableQuantity}
                onChange={handleChange}
                name="availableQuantity"
                type='number'
                className="w-full form-control"
                placeholder="Input text"
              />
            </div>
            <div className="mt-4">
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Upload image
                  </h2>
                </div>
                <div className="flex items-center mx-auto space-x-3">
                  {/* @ts-ignore */}
                  <img className="h-[180px] w-[250px]" src={file} alt="img" />
                  <button
                    className="file__uplaod h-[100px] w-[150px] rounded-2xl border border-gray-400 text-primary1 dark:border-white"
                  >
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        selectFile(base64)
                      }
                    />
                    Change
                  </button>
                </div>
              </>
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Categories
              </label>
              <TomSelect
                id="crud-form-2"
                value={categories}
                onChange={setCategories}
                className="w-full"
                multiple
              >
                <option value="1">Sport & Outdoor</option>
              </TomSelect>
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Available Sizes
              </label>
              <TomSelect
                id="crud-form-2"
                value={sizes}
                onChange={setSizes}
                className="w-full"
                multiple
              >
                <option value="XXX-L">XXX-L</option>
                <option value="XX-L">XX-L</option>
                <option value="X-L">X-L</option>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
              </TomSelect>
            </div>
            <div className="mt-3">
              <label>Active Status</label>
              <div className="mt-2 form-switch">
                <input value={formData.activeStatus} onChange={handleChange} type="checkbox" name="activeStatus" className="form-check-input" />
              </div>
            </div>
            <div className="mt-3">
              <label>Description</label>
              <div className="mt-2">
                <textarea className="w-full h-[150px] rounded-sm" value={formData.description} onChange={handleChange} name="description" placeholder="Description" />
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                type="button"
                className="w-24 mr-1 btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} className="w-24 btn btn-primary">
                Save
              </button>
            </div>
          </div>
          {/* END: Form Layout */}
        </div>
      </div>
    </>
  );
}

export default Main;
