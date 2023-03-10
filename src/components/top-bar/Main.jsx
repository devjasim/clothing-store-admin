import { useEffect, useState } from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Profile from '../../assets/images/profile.png';
import EditModal from "../../views/users-layout-2/EditModal";
import EditPassword from "../../views/users-layout-2/EditPass";

function Main() {
  const [profileData, setProfileData] = useState();
  const dispatch = useDispatch();

  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/login");
    setProfileData(null);
  };

  let data;
  if(localStorage.getItem("profile")) {
    data = localStorage.getItem("profile");
  }


  useEffect(() => {
    const token = profileData?.result?.token;

    if (token) {
      const decodeedToekn = decode(token);

      if (decodeedToekn.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setProfileData(JSON.parse(localStorage.getItem("profile")));
  }, [location, data]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  return (
    <>
      {/* BEGIN: Top Bar */}
      {showProfileModal && (
        <EditModal id={profileData?._id} buttonModalPreview={showProfileModal} setButtonModalPreview={setShowProfileModal} />
      )}
      {showPassModal && (
        <EditPassword id={profileData?._id} showPassModal={showPassModal} setShowPassModal={setShowPassModal} />
      )}
      <div className="top-bar">
        {/* BEGIN: Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="hidden mr-auto -intro-x sm:flex"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Application</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {location.pathname === "/users" ? "User" : "Dashboard"}
            </li>
          </ol>
        </nav>
        {/* END: Breadcrumb */}
        {/* BEGIN: Search */}
        <div className="relative mr-3 intro-x sm:mr-6">
          {/* <div className="hidden search sm:block">
            <input
              type="text"
              className="border-transparent search__input form-control"
              placeholder="Search..."
              onFocus={showSearchDropdown}
              onBlur={hideSearchDropdown}
            />
            <Lucide
              icon="Search"
              className="search__icon dark:text-slate-500"
            />
          </div>
          <a className="notification sm:hidden" href="">
            <Lucide
              icon="Search"
              className="notification__icon dark:text-slate-500"
            />
          </a> */}
          {/* <div
            className={classnames({
              "search-result": true,
              show: searchDropdown,
            })}
          >
            <div className="search-result__content">
              <div className="search-result__content__title">Pages</div>
              <div className="mb-5">
                <a href="" className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success">
                    <Lucide icon="Inbox" className="w-4 h-4" />
                  </div>
                  <div className="ml-3">Mail Settings</div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending">
                    <Lucide icon="Users" className="w-4 h-4" />
                  </div>
                  <div className="ml-3">Users & Permissions</div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                    <Lucide icon="CreditCard" className="w-4 h-4" />
                  </div>
                  <div className="ml-3">Transactions Report</div>
                </a>
              </div>
              <div className="search-result__content__title">Users</div>
              <div className="mb-5">
                {$_.take($f(), 4).map((faker, fakerKey) => (
                  <a key={fakerKey} href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-3">{faker.users[0].name}</div>
                    <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                      {faker.users[0].email}
                    </div>
                  </a>
                ))}
              </div>
              <div className="search-result__content__title">Products</div>
              {$_.take($f(), 4).map((faker, fakerKey) => (
                <a key={fakerKey} href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-full"
                      src={faker.images[0]}
                    />
                  </div>
                  <div className="ml-3">{faker.products[0].name}</div>
                  <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                    {faker.products[0].category}
                  </div>
                </a>
              ))}
            </div>
          </div> */}
        </div>
        {/* END: Search  */}
        {/* BEGIN: Notifications */}
        {/* <Dropdown className="mr-auto intro-x sm:mr-6">
          <DropdownToggle
            tag="div"
            role="button"
            className="cursor-pointer notification notification--bullet"
          >
            <Lucide
              icon="Bell"
              className="notification__icon dark:text-slate-500"
            />
          </DropdownToggle>
          <DropdownMenu className="pt-2 notification-content">
            <DropdownContent tag="div" className="notification-content__box">
              <div className="notification-content__title">Notifications</div>
              {$_.take($f(), 5).map((faker, fakerKey) => (
                <div
                  key={fakerKey}
                  className={classnames({
                    "cursor-pointer relative flex items-center": true,
                    "mt-5": fakerKey,
                  })}
                >
                  <div className="flex-none w-12 h-12 mr-1 image-fit">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-full"
                      src={faker.photos[0]}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href="" className="mr-5 font-medium truncate">
                        {faker.users[0].name}
                      </a>
                      <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                        {faker.times[0]}
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      {faker.news[0].shortContent}
                    </div>
                  </div>
                </div>
              ))}
            </DropdownContent>
          </DropdownMenu>
        </Dropdown> */}
        {/* END: Notifications  */}
        {/* BEGIN: Account Menu */}
        <span className="mr-4 text-lg">{profileData?.userName}</span>
        <Dropdown className="w-8 h-8 intro-x">
          
          <DropdownToggle
            tag="div"
            role="button"
            className="w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in"
          >
            <img
              alt="User"
              src={profileData?.avatar || Profile}
            />
          </DropdownToggle>
          <DropdownMenu className="w-56">
            <DropdownContent className="text-white bg-primary">
              <DropdownHeader tag="div" className="!font-normal">
                <div className="font-medium">{profileData?.userName}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {/* {$f()[0].jobs[0]} */}
                </div>
              </DropdownHeader>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem onClick={() => setShowProfileModal(true)} className="hover:bg-white/5">
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
              </DropdownItem>
              <DropdownItem onClick={() => setShowPassModal(true)} className="hover:bg-white/5">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
              </DropdownItem>
              <DropdownItem className="hover:bg-white/5">
                <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
              </DropdownItem>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem  onClick={() => logout()}  className="hover:bg-white/5">
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        {/* END: Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
