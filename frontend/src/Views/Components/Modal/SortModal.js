import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { applySort, changeModalState } from "../../../Database/Action/ConstantAction";
import { sortinCondition } from "../../Constant/FilterConditionList";
import isEmpty from "lodash.isempty";
import toast from "react-hot-toast";

const SortModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.ConstantReducer.modalState);
  const [columnId, setColumnId] = useState('');
  const [conditionId, setConditionId] = useState(1);

  const filterTable = async () => {
    const { screenName } = modalState;
    if (isEmpty(columnId) || columnId == 'Select Column...') {
      toast.error("Please select column")
    } else if (isEmpty(conditionId) || conditionId == 1) {
      toast.error("Please select condition")
    } else {
      await dispatch(applySort({ columnId: columnId, conditionId: parseInt(conditionId), allData: modalState.data, screenName: screenName }))
      await dispatch(changeModalState({ openState: false, content: "", dataColumn: [], data: [], screenName: '' }))
    }
  }

  const getColumnList = () => {
    const { column } = modalState;
    let newVal = ["Select Columns...", ...column];
    return newVal;
  };
  const columnList = getColumnList();
  return (
    <Wrapper>
      <div className="modal-layout">
        <p className="header-title">Sorting Tables</p>
        <p style={{ color: "white", marginBottom: "10px" }}>
          Select{" "}
          <span className="text-danger" style={{ fontWeight: "bold" }}>
            Records
          </span>{" "}
          to apply sorting conditions.
        </p>
        <hr />
        <div className="modal-custom-body col-lg-12 col-md-12 col-sm-12 d-flex">
          <div className="row">
            <div className="col-sm-5">
              <p>Columns</p>
              <select className="selectpicker" onChange={(e) => setColumnId(e.target.value)}>
                {columnList.map((item, index) => {
                  return (
                    <option key={index} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-sm-5">
              <div style={{ marginLeft: "20px" }}>
                <p>Conditions</p>
                <select className="selectpicker" onChange={(e) => setConditionId(e.target.value)}>
                  {
                    sortinCondition.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>{item.title}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-sm-2" style={{ visibility: 'hidden' }}>
              <div className="float-end">
                <p>Action</p>
                <i className="fa-solid fa-xmark actionIcon" />
                <i className="fa-solid fa-add actionIcon" />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="modal-footer">
          <button
            className="footer-button"
            style={{ marginRight: '15px' }} onClick={() => dispatch(changeModalState({ openState: false, content: "", dataColumn: [], data: [], screenName: '' }))}>
            Cancel
          </button>
          <button className="footer-button" onClick={() => filterTable()}>Apply</button>
        </div>
      </div>
    </Wrapper >
  );
};

const Wrapper = styled.section`
  .modal-layout {
    height: 100%;
    width: 750px;
    background-color: transparent;
    padding: 10px 25px;
  }
  .header-title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: "Arvo", serif;
  }

  .selectpicker {
    display: block !important;
    width: 250px;
    background-color: #b7c1d1;
    border-radius: 5px;
    padding: 5px 20px 5px 20px;
    padding-right: 5px;
    border: 0px;
    outline: 0px;

    option {
      background: #151535;
      color: white;
    }
  }
  .modal-custom-body {
    p {
      color: white;
      font-weight: bold;
      font-size: 12px;
      font-family: "Arvo", serif;
    }
    .inputValue {
      margin-left: 20px;
      background-color: #b7c1d1;
      border-radius: 5px;
      padding: 5px 20px 5px 20px;
      border: 0px;
      outline: 0px;
    }
  }
  .actionIcon {
      color: white;
      margin: 0 5px 0 5px;
      cursor: pointer;
      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.themeColor};
        padding: 5px;
      }
    }
    
  .modal-footer {
    float: right;
    .footer-button{
        padding: 10px 2rem 10px 2rem;
        background: ${({ theme }) => theme.colors.themeColor};
        cursor: pointer;
        color: white;
      &:hover,
      &:active {
        background-color: transparent;
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.themeColor};
        color: white;
        font-weight: bold;
      }
    }
  }

  hr {
    border: 1px solid #f29f58;
  }
`;

export default SortModal;
