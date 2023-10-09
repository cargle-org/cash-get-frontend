import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStore } from "../../../store/appSlice";
import { linkTo } from "../../../routes/routing";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearStore());
    navigate(`/${linkTo.auth()}`, {
      replace: true,
    });
  }, []);
  return <div>Logout</div>;
};

export default Logout;
