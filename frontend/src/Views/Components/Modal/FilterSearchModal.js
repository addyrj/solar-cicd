import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "datatables.net-buttons";
import JSZip from "jszip";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-responsive";
import "../../../Style/datatables_custom.css";
import { initDatatable } from "../../../JavaScript/Datatables";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchData } from "../../../Database/Action/ConstantAction";

const FilterSearchModal = () => {
  const dispatch = useDispatch();
  const filterColumn = useSelector(
    (state) => state.DashboardReducer.filterColumn
  );
  // filterSearchData
  const localDeviceDetail = useSelector(
    (state) => state.DashboardReducer.localDeviceDetail
  );

  const searchDataList = useSelector(
    (state) => state.ConstantReducer.filterSearchData
  );

  const [localDevice, setLocalDevice] = useState([]);
  const [filterData, setFilterData] = useState({
    sourceData: localDeviceDetail,
    countryState: false,
    countryData: "",
    provienceState: false,
    provienceData: "",
    districtState: false,
    districtData: "",
    villageState: false,
    villageData: "",
  });

  const getCountryList = () => {
    const { countryColumn } = filterColumn;
    let newVal = ["Select Country...", ...countryColumn];
    return newVal;
  };

  const getProvienceList = () => {
    const { provienceColumn } = filterColumn;
    let newVal = ["Select Provience...", ...provienceColumn];
    return newVal;
  };

  const getDistrictList = () => {
    const { districtColumn } = filterColumn;
    let newVal = ["Select District...", ...districtColumn];
    return newVal;
  };

  const getVillageList = () => {
    const { villageColumn } = filterColumn;
    let newVal = ["Select Village...", ...villageColumn];
    return newVal;
  };

  const countryList = getCountryList();
  const provienceList = getProvienceList();
  const districtList = getDistrictList();
  const villageList = getVillageList();

  const filterSearch = () => {
    dispatch(filterSearchData(filterData));
    setFilterData({
      ...filterData,
      countryState: false,
      countryData: "",
      provienceState: false,
      provienceData: "",
      districtState: false,
      districtData: "",
      villageState: false,
      villageData: "",
    })
  };

  useEffect(() => {
    if (localDevice.length !== 0) {
      window.JSZip = JSZip;
      initDatatable();
    }
  }, [localDevice]);

  useEffect(() => {
    setLocalDevice(searchDataList);
  }, [searchDataList]);
  return (
    <Wrapper>
      <div className="modal-layout">
        <p className="header-title">Search Filter :</p>
        <p style={{ color: "white", fontWeight: "bold" }}>
          Search <span className="text-danger">Records</span> to apply filter
          conditions.
        </p>
        <hr />
        <div className="search-bx mx-5">
          <form>
            <div className="input-group" style={{ width: "100%" }}>
              <div>
                <p className="selectLabel">Country</p>
                <select
                  className="selectpicker"
                  value={filterData.countryData}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      countryState: true,
                      countryData: e.target.value,
                    })
                  }
                >
                  {countryList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <p className="selectLabel">State</p>
                <select
                  className="selectpicker"
                  value={filterData.provienceData}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      provienceState: true,
                      provienceData: e.target.value,
                    })
                  }
                >
                  {provienceList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <p className="selectLabel">District</p>
                <select
                  className="selectpicker"
                  value={filterData.districtData}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      districtState: true,
                      districtData: e.target.value,
                    })
                  }
                >
                  {districtList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <p className="selectLabel">Village</p>
                <select
                  className="selectpicker"
                  value={filterData.villageData}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      villageState: true,
                      villageData: e.target.value,
                    })
                  }
                >
                  {villageList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <p className="selectLabel">Action</p>
                <button
                  type="button"
                  className="applyButton"
                  onClick={() => filterSearch()}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <hr />
        <div style={{ paddingBottom: "20px" }}>
          <table
            className="table text-fade table-bordered table-hover"
            id="example-datatables"
          >
            <thead>
              <tr className="text-dark">
                <th>Uid</th>
                <th>Title</th>
                <th>Date</th>
                <th>Coordinates</th>
                <th>Solar Mamas</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {localDevice.map((item) => {
                return (
                  <tr>
                    <td className="text-dark" style={{ fontSize: "16px" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.ID}
                        id={item.ID}
                      />
                      {item.UID}
                    </td>
                    <td>{item.Title}</td>
                    <td>{item.InstallDate}</td>
                    <td>{item.Coordinates}</td>
                    <td>{item.SolarMamas}</td>
                    <td>{item.Comments}</td>
                    <td>
                      <i className="fa-solid fa-eye iconStyle" />
                      <i className="fa-solid fa-trash iconStyle" />
                      <i className="fa-solid fa-pen-to-square iconStyle" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .modal-layout {
    width: 800px;
    height: 400px;
    background-color: transparent;
    padding: 10px 25px;
  }
  .header-title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: "Arvo", serif;
  }
  hr {
    border: 1px solid #f29f58;
  }
  .selectLabel {
    color: white;
    font-family: "Arvo", serif;
    font-size: 16px;
    font-weight: bold;
    align-items: center;
    text-align: center;
  }
  .selectpicker {
    width: 130px;
    display: block !important;
    background-color: #b7c1d1;
    border-radius: 5px;
    border: 0px;
    outline: 0px;
    padding: 5px 20px 5px 20px;
    padding-right: 5px;
    margin: 5px;

    option {
      background: #151535;
      color: white;
    }
  }

  .applyButton {
    width: 130px;
    display: block !important;
    background: ${({ theme }) => theme.colors.themeColor};
    border-radius: 5px;
    border: 0px;
    outline: 0px;
    padding: 5px 20px 5px 20px;
    padding-right: 5px;
    margin: 5px 5px 5px 5px;
    color: white;
    font-size: 15px;
    &:hover,
    &:active {
      background-color: transparent;
      border: 1px solid;
      border-color: ${({ theme }) => theme.colors.themeColor};
      color: white;
      font-weight: bold;
    }
  }
`;

export default FilterSearchModal;
