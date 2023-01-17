import {
  Lucide,
  Tippy,
  Modal,
  ModalBody,
} from "@/base-components";
import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions/product";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector(state => state.products);

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Data List Layout</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <button className="mr-2 shadow-md btn btn-primary">
            <Link to="/create-product">
              Add New Product
            </Link>
          </button>

          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <input
                type="text"
                className="w-56 pr-10 form-control box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <table className="table -mt-2 table-report">
            <thead>
              <tr>
                <th className="whitespace-nowrap">IMAGES</th>
                <th className="whitespace-nowrap">PRODUCT NAME</th>
                <th className="text-center whitespace-nowrap">STOCK</th>
                <th className="text-center whitespace-nowrap">STATUS</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {(products?.data || []).map((item) => (
                <tr key={item._id} className="intro-x">
                  <td className="w-40">
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <Tippy
                          tag="img"
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full"
                          src={item.images[0]}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {item.productName}
                    </a>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {item.categories[0]}
                    </div>
                  </td>
                  <td className="text-center">{item.availableQuantity}</td>
                  <td className="w-40">
                    <div
                      className={classnames({
                        "flex items-center justify-center": true,
                        "text-success": item.activeStatus,
                        "text-danger": !item.activeStatus,
                      })}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {item.activeStatus ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="w-56 table-report__action">
                    <div className="flex items-center justify-center">
                      <a className="flex items-center mr-3" href="#">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => {
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1 btn btn-outline-secondary"
            >
              Cancel
            </button>
            <button type="button" className="w-24 btn btn-danger">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
