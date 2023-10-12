import OrderHistory from "../../components/order/OrderHistory";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/appSlice";

import OrderCollectionComplex from "../../components/order/OrderCollectionComplex";

const DashboardShopActiveOrders = () => {
  const completedOrderCollection = useSelector((state: RootState) => state.orderCollection.activeOrderCollections);
  return (
    <section className="flex gap-8 h-full pb-5">
      <div className=" flex-grow  rounded-2xl  overflow-auto space-y-8">
        {completedOrderCollection.length > 0 ? (
          completedOrderCollection.map((orderCollection) => <OrderCollectionComplex orderCollection={orderCollection} />)
        ) : (
          <div className=" text-center">No Orders Available</div>
        )}
      </div>
      <OrderHistory />
    </section>
  );
};

export default DashboardShopActiveOrders;
