import { useFormik } from "formik";
import { useMemo } from "react";
import { createOrderValidationSchema } from "./validation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";
import { orderApi } from "../../../../services/order.service";
import { isObjectEmpty, nairaCurrencyFormatter } from "../../../../utils/misc";
import useNotification from "../../../../context/notification";
import OrderHistory from "../components/order/OrderHistory";
// import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  // const navigate = useNavigate()
  const shop = useSelector((state: RootState) => state.auth.user);
  const { openNotification } = useNotification();
  const [createOrder, { data, isSuccess, isLoading, error, isError }] = orderApi.useCreateOrderMutation();

  const createOrderFormik = useFormik({
    validationSchema: createOrderValidationSchema,
    initialValues: {
      amount: "0",
      address: shop?.address || "",
      contactName: "",
      contactNumber: shop?.phoneNo || "",
      deliveryPeriod: "",
      extraInfo: "",
    },
    onSubmit: (values) => {
      createOrder({ shopId: shop?.id || "", body: { ...values, amount: parseFloat(values.amount) } });
    },
  });

  useMemo(() => {
    if (isSuccess) {
      openNotification({
        type: "success",
        text: data!.message,
      });
    }
  }, [isSuccess]);

  const changeDeliveryDate = (date: string) => {
    if (!date) {
      return;
    }
    console.log(date);
    const d = date.split(":");
    const hours = parseInt(d[0]);
    const minutes = parseInt(d[1]) || 0;
    const today = new Date();
    today.setHours(hours);
    today.setMinutes(minutes);
    createOrderFormik.setFieldValue("deliveryPeriod", today);
  };

  useMemo(() => {
    if (isError) {
      openNotification({
        type: "failure",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: error as any,
      });
    }
  }, [isError]);

  return (
    <section className="flex gap-8 h-full pb-5">
      <div className=" flex-grow bg-white rounded-2xl p-10 overflow-auto shadow">
        <h2 className=" text-2xl text-cash-get-dark-200 text-center">Create Order</h2>
        <form onSubmit={createOrderFormik.handleSubmit} className="mt-10 ">
          <div className="space-y-5">
            <div className="relative custom-input-with-label">
              <input
                type="text"
                id="amount"
                name="amount"
                value={nairaCurrencyFormatter(createOrderFormik.values.amount)}
                onChange={(e) => createOrderFormik.setFieldValue("amount", e.target.value.substring(1).replace(/,/g, "") || "0")}
                onBlur={createOrderFormik.handleBlur}
                className="h-14 rounded-lg border border-cash-get-dark-500 w-full px-4"
                placeholder="₦0"
              />
              <label
                htmlFor="amount"
                className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-7 transform -translate-y-1/2 cursor-text"
              >
                Enter Amount
              </label>
              {createOrderFormik.touched.amount && createOrderFormik.errors.amount && (
                <span className=" text-xs py-1 text-red-600">{createOrderFormik.errors.amount}</span>
              )}
            </div>
            <div className="relative custom-input-with-label">
              <input
                type="text"
                id="address"
                name="address"
                value={createOrderFormik.values.address}
                onChange={createOrderFormik.handleChange}
                onBlur={createOrderFormik.handleBlur}
                className="h-14 rounded-lg border border-cash-get-dark-500 w-full px-4"
                placeholder="Enter Address"
              />
              <label
                htmlFor="address"
                className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-7 transform -translate-y-1/2 cursor-text"
              >
                Enter Address
              </label>
              {createOrderFormik.touched.address && createOrderFormik.errors.address && (
                <span className=" text-xs py-1 text-red-600">{createOrderFormik.errors.address}</span>
              )}
            </div>
            <div className="relative custom-input-with-label">
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={createOrderFormik.values.contactName}
                onChange={createOrderFormik.handleChange}
                onBlur={createOrderFormik.handleBlur}
                className="h-14 rounded-lg border border-cash-get-dark-500 w-full px-4"
                placeholder="Enter Contact Name"
              />
              <label
                htmlFor="contactName"
                className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-7 transform -translate-y-1/2 cursor-text"
              >
                Enter Contact Name
              </label>
              {createOrderFormik.touched.contactName && createOrderFormik.errors.contactName && (
                <span className=" text-xs py-1 text-red-600">{createOrderFormik.errors.contactName}</span>
              )}
            </div>
            <div className="relative custom-input-with-label">
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={createOrderFormik.values.contactNumber}
                onChange={createOrderFormik.handleChange}
                onBlur={createOrderFormik.handleBlur}
                className="h-14 rounded-lg border border-cash-get-dark-500 w-full px-4"
                placeholder="Enter Contact Name"
              />
              <label
                htmlFor="contactNumber"
                className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-text"
              >
                Enter Contact Number
              </label>
              {createOrderFormik.touched.contactNumber && createOrderFormik.errors.contactNumber && (
                <span className=" text-xs py-1 text-red-600">{createOrderFormik.errors.contactNumber}</span>
              )}
            </div>
            <div className="relative custom-input-with-label">
              <input
                type="time"
                id="deliveryPeriod"
                name="deliveryPeriod"
                // value={`${new Date(createOrderFormik.values.deliveryPeriod).getHours()}:${
                //   new Date(createOrderFormik.values.deliveryPeriod).getMinutes() < 10
                //     ? `0${new Date(createOrderFormik.values.deliveryPeriod).getMinutes()}`
                //     : new Date(createOrderFormik.values.deliveryPeriod).getMinutes()
                // } `}
                onChange={(e) => changeDeliveryDate(e.target.value)}
                onBlur={createOrderFormik.handleBlur}
                className="h-14 rounded-lg border border-cash-get-dark-500 w-full px-4"
                placeholder="Enter Delivery Name"
              />
              <label
                htmlFor="deliveryPeriod"
                className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-text"
              >
                Enter Delivery Period
              </label>
              {createOrderFormik.touched.deliveryPeriod && createOrderFormik.errors.deliveryPeriod && (
                <span className=" text-xs py-1 text-red-600">{createOrderFormik.errors.deliveryPeriod}</span>
              )}
            </div>
            <div className="relative custom-input-with-label">
              <textarea
                id="extraInfo"
                name="extraInfo"
                value={createOrderFormik.values.extraInfo}
                onChange={createOrderFormik.handleChange}
                onBlur={createOrderFormik.handleBlur}
                className=" rounded-lg border border-cash-get-dark-500 w-full p-4 h-60"
                placeholder="Enter Extra Info"
              />
              <label
                htmlFor="extraInfo"
                className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-8 transform -translate-y-1/2 cursor-text"
              >
                Enter Extra Info
              </label>
              {createOrderFormik.touched.extraInfo && createOrderFormik.errors.extraInfo && (
                <span className=" text-xs py-1 text-red-600">{createOrderFormik.errors.extraInfo}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!isObjectEmpty(createOrderFormik.errors) || isObjectEmpty(createOrderFormik.touched) || isLoading}
            className=" h-14 rounded-lg text-white bg-cash-get-dark-500 mt-7 text-lg font-medium w-full disabled:bg-cash-get-dark-200"
          >
            {isLoading ? "...isLoading" : "CREATE ORDER"}
          </button>
        </form>
      </div>
      <OrderHistory />
    </section>
  );
};

export default CreateOrder;
