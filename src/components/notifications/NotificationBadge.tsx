import React, { useLayoutEffect, useRef, useState } from "react";
import { INotificationData } from "../../context/notification/types";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";
import gsap from "gsap";

const NotificationBadge: React.FC<{ data: INotificationData; closeNotification: (id: string) => void }> = (props) => {
  const { closeNotification, data } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ctx, setCtx] = useState(gsap.context(() => {}));
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setTimeout(() => {
      ctx.close();
      console.log("closed");
    }, 10000);
  };

  useLayoutEffect(() => {
    ctx.add("open", () => {
      gsap.to(badgeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        onComplete: () => handleClose(),
      });
    });
    ctx.add("close", () => {
      gsap.to(badgeRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        onComplete: () => closeNotification(data.id),
      });
    });
    ctx.open();
    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={badgeRef}
      className={`opacity-0 scale-50 w-96 border shadow-md ${
        data.type === "success" ? "border-green-800 bg-green-200" : data.type === "info" ? "border-blue-800 bg-blue-200" : "border-red-800 bg-red-200"
      }  rounded-lg  flex p-2 gap-2 relative items-start`}
    >
      {data.type === "success" ? (
        <AiOutlineCheckCircle size={20} className="text-green-800 shrink-0" />
      ) : data.type === "info" ? (
        <AiOutlineInfoCircle size={20} className="text-blue-800  shrink-0" />
      ) : (
        <AiOutlineWarning size={20} className="text-red-800  shrink-0" />
      )}
      <div className={`flex-grow pr-5  ${data.type === "success" ? "text-green-800" : data.type === "info" ? "text-blue-800" : "text-red-800"}`}>
        {data.title && <p className="text-sm font-medium">{data.title}</p>}
        <p className="text-xs  font-light">{data.text}</p>
      </div>
      <IoMdClose onClick={() => ctx.close()} size={18} role="button" className="absolute right-2 top-2 text-gray-600" />
    </div>
  );
};

export default NotificationBadge;
