import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { loginValidationSchema } from "./validation";
import { isObjectEmpty } from "../../../utils/misc";
import { authApi } from "../../../services/auth.service";
import { UserEnum } from "../../../services/types";
import useNotification from "../../../context/notification";
import { useNavigate } from "react-router-dom";
import { linkTo } from "../../../routes/routing";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signingType, setSigningType] = useState<UserEnum>(UserEnum.AGENT);
  const { openNotification } = useNotification();

  const [signIn, { data, isSuccess, isLoading, error, isError }] = authApi.useSignInMutation();
  const loginFormik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signIn({ ...values, email: values.email.toLowerCase(), role: signingType });
    },
  });

  useMemo(() => {
    if (isError) {
      openNotification({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: error as any,
        type: "failure",
      });
      console.log(data);
    }
  }, [isError]);

  useMemo(() => {
    if (isSuccess) {
      if (data?.data?.user.role !== signingType) {
        openNotification({
          text: `User is not  ${signingType}`,
          type: "failure",
        });
        return;
      }
      openNotification({
        text: `${signingType} signed in successfully`,
        type: "success",
      });
      dispatch(login(data!.data!));
      if (signingType === UserEnum.SHOP) {
        navigate(`/${linkTo.dashboard()}/${linkTo.dashboardShop()}`);
      } else {
        navigate(`/${linkTo.dashboard()}/${linkTo.dashbaordAgent()}`);
      }
    }
  }, [isSuccess]);

  return (
    <div className="pt-12 min-h-screen bg-cash-get-light-blue">
      <div className="max-w-4xl bg-white py-20 px-28 rounded-2xl mx-auto">
        <div className=" flex justify-center gap-6">
          <button
            onClick={() => setSigningType(UserEnum.SHOP)}
            className={` w-72 h-14 font-semibold rounded-lg ${
              signingType === UserEnum.SHOP ? "bg-cash-get-dark-500 text-white " : "border-cash-get-dark-500 border text-cash-get-dark-500"
            } `}
          >
            SHOP LOGIN
          </button>
          <button
            onClick={() => setSigningType(UserEnum.AGENT)}
            className={` w-72 h-14 font-semibold rounded-lg ${
              signingType === UserEnum.AGENT ? "bg-cash-get-dark-500 text-white " : "border-cash-get-dark-500 border text-cash-get-dark-500"
            } `}
          >
            AGENT LOGIN
          </button>
        </div>
        <form onSubmit={loginFormik.handleSubmit} className="mt-28">
          <div className=" space-y-8">
            <div className="">
              <input
                name="email"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                id="email"
                type="email"
                required
                placeholder="Email"
                className="h-20 w-full px-8 rounded border-cash-get-dark-500 border text-cash-get-dark-500"
              />
              {loginFormik.touched.email && loginFormik.errors.email && (
                <span className=" text-xs py-1 text-red-600">{loginFormik.errors.email}</span>
              )}
            </div>
            <div className="">
              <input
                name="password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                id="email"
                type="password"
                placeholder="Password"
                className="h-20 w-full px-8 rounded border-cash-get-dark-500 border text-cash-get-dark-500"
              />
              {loginFormik.touched.password && loginFormik.errors.password && (
                <span className=" text-xs py-1 text-red-600">{loginFormik.errors.password}</span>
              )}
            </div>
          </div>
          <button
            disabled={!isObjectEmpty(loginFormik.errors) || isObjectEmpty(loginFormik.touched) || isLoading}
            type="submit"
            className="h-20 w-full px-8 rounded bg-cash-get-dark-500 text-white mt-10 disabled:bg-cash-get-dark-200 text-xl font-semibold uppercase"
          >
            {isLoading ? "...Loading" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
