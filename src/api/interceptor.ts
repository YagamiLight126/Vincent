import { message as antdMessage, notification } from "antd";

import { ResponseData } from "../utils/api-request";
antdMessage.config({ maxCount: 1 });

// 处理请求错误
export function handleRequestError(
  result: ResponseData,
  notifyType = "message"
) {
  const { message } = result;
  if (notifyType === "notification") {
    notification.destroy();
    notification.warning({
      message: "操作提示",
      description: message,
    });
  } else {
    antdMessage.error(message);
  }
}
