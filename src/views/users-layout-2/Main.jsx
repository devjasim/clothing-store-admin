import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Notification
} from "@/base-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../redux/actions/users";
import EditModal from "./EditModal";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { users } = useSelector(state => state);
  const [userData,  setUserData] = useState([]);

  const basicNonStickyNotification = useRef();

  const hadnleDeleteUser = (id) => {
    if(id) {
      dispatch(deleteUser(id, basicNonStickyNotification));
    }
  }

  useEffect(() => {
    setUserData(users)
  }, [users])

  const [ buttonModalPreview, setButtonModalPreview ] = useState(false);
  const [ userId, setUserId ] = useState(null);

  const handleModal = (id) => {
    setButtonModalPreview(true);
    setUserId(id)
  }

  const handleSearch = (e) => {
    const {value} = e.target;
    if(value) {
      const arr = userData.filter((item) => item.userName.toLowerCase().includes(value.toLowerCase()));
      if(arr.length > 0) {
        setUserData(arr);
      }
    } else {
      setUserData(users)
    }
  }

  return (
    <>
      {buttonModalPreview && (
        <EditModal id={userId} buttonModalPreview={buttonModalPreview} setButtonModalPreview={setButtonModalPreview} />
      )}
      <h2 className="mt-10 text-lg font-medium intro-y">Users Layout</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <input
                type="text"
                className="w-56 pr-10 form-control box"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Users Layout */}
        {userData?.map((item) => (
          <div key={item._id} className="col-span-12 intro-y md:col-span-6">
            <div className="box">
              <div className="flex flex-col items-center p-5 lg:flex-row">
                <div className="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    src={item.avatar}
                  />
                </div>
                <div className="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
                  <a href="" className="font-medium">
                    {item.userName}
                  </a>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {item.roles}
                  </div>
                </div>
                <div className="flex mt-4 lg:mt-0">
                  <Notification getRef={(el)=> {
                      basicNonStickyNotification.current = el;
                    }}
                      options={{ duration: 3000 }}
                      className="flex flex-col sm:flex-row"
                    >
                    <div className="font-medium">
                        User deleted successfully!
                    </div>
                  </Notification>
                  <button onClick={() => hadnleDeleteUser(item._id)} className="px-2 py-1 mr-2 btn btn-danger">
                    Delete
                  </button>
                  <button onClick={() => handleModal(item._id)} className="px-2 py-1 mr-2 btn btn-primary">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* BEGIN: Users Layout */}
        {/* END: Pagination */}
        {/* <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 mt-3 form-select box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div> */}
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default Main;
