import {
  Lucide,
  Tippy
} from "@/base-components";

import { useEffect, useRef, useState } from "react";
import { getDashboard } from "../../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState();
  const importantNotesRef = useRef();

  const dispatch = useDispatch();

  const prevImportantNotes = () => {
    importantNotesRef.current.tns.goTo("prev");
  };

  const nextImportantNotes = () => {
    importantNotesRef.current.tns.goTo("next");
  };

  const { dashboard } = useSelector(state => state);
  const [ data, setData ] = useState();

  useEffect(() => {
    dispatch(getDashboard())
  }, []);

  useEffect(() => {
    setData(dashboard)
  }, [dashboard]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                General Report
              </h2>
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
                Data
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-primary"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="cursor-pointer report-box__indicator bg-success"
                          content="33% Higher than last month"
                        >
                          {((data?.total / 30) * 100).toFixed(2)}%
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {data?.total}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Total User
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-pending"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="cursor-pointer report-box__indicator bg-success"
                          content="2% Lower than last month"
                        >
                          {((data?.lastWeek / 7) * 100).toFixed(2)}%
                          <Lucide
                            icon="ChevronDown"
                            className="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {data?.lastWeek}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Last 7 Days User
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-warning"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="cursor-pointer report-box__indicator bg-success"
                          content="12% Higher than last month"
                        >
                          {((data?.lastThirtee / 30) * 100).toFixed(2)}
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {data?.lastThirtee}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Last 30 Days User
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-success"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="cursor-pointer report-box__indicator bg-success"
                          content="22% Higher than last month"
                        >
                          {((data?.lastMonth / 30) * 100).toFixed(2)}%
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {data?.lastMonth}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Last Month User
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report
          {/* BEGIN: Sales Report */}
        </div>
      </div>
    </div>
  );
}

export default Main;
