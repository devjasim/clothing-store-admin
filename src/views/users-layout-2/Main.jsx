import {
  Lucide
} from "@/base-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../redux/actions/users";
import EditModal from "./EditModal";
import EditPassword from "./EditPass";
import Profile from '../../assets/images/profile.png';
import CreateUser from "./CreateUser";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { users } = useSelector(state => state);
  const [userData,  setUserData] = useState([]);

  const deleteNotification = useRef();
  const [deleteMessage, setDelteMessage] = useState("User deleted successfully");

  const hadnleDeleteUser = (id) => {
    if(id) {
      dispatch(deleteUser(id, deleteNotification, setDelteMessage));
    }
  }

  useEffect(() => {
    setUserData(users)
  }, [users])

  const [ showProfileModal, setShowProfileModal ] = useState(false);
  const [ showPassModal, setShowPassModal ] = useState(false);
  const [ createUserModal, setCreateUserModal ] = useState(false);
  const [ userId, setUserId ] = useState(null);

  const handleModal = (id) => {
    setShowProfileModal(true);
    setUserId(id)
  }

  const handlePassword = (id) => {
    setShowPassModal(true);
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

  const handleCreate = () => {
    setCreateUserModal(true);
  }

  return (
    <>
      {showProfileModal && (
        <EditModal id={userId} buttonModalPreview={showProfileModal} setButtonModalPreview={setShowProfileModal} />
      )}
      {createUserModal && (
        <CreateUser id={userId} createUserModal={createUserModal} setCreateUserModal={setCreateUserModal} />
      )}
      {showPassModal && (
        <EditPassword id={userId} showPassModal={showPassModal} setShowPassModal={setShowPassModal} />
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
          <div className="ml-4">
            <button onClick={handleCreate} className="px-2 text-base py-1.5 btn-primary btn">Creat New User</button>
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
                    src={item.avatar || Profile}
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
                  <button onClick={() => hadnleDeleteUser(item._id)} className="px-2 py-1 mr-2 btn btn-danger">
                    <Lucide
                      icon="Trash"
                      className="inset-y-0 right-0 w-4 h-4 my-auto"
                    />
                  </button>
                  <button onClick={() => handleModal(item._id)} className="px-2 py-1 mr-2 btn btn-primary">
                    Edit Profile
                  </button>
                  <button onClick={() => handlePassword(item._id)} className="px-2 py-1 mr-2 btn btn-warning">
                    Edit Password
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
