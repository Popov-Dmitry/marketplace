import React from 'react';
import {Card} from "react-bootstrap";

const OrderStatusChart = ({status}) => {
    return (
        <div>
            {(status === "CREATED" || status === "ACCEPTED" || status === "DELIVERY" ||
                    status === "WAITING" || status === "DELIVERED") &&
                <div className={"d-flex justify-content-between"}>
                    <div className="chart-container">
                        <div
                            className={`${(status === "CREATED" || status === "ACCEPTED" || status === "DELIVERY" ||
                                status === "WAITING" || status === "DELIVERED") && "chart-active"}`}
                        >
                            1
                        </div>
                        <div
                            className={`${(status === "ACCEPTED" || status === "DELIVERY" ||
                                status === "WAITING" || status === "DELIVERED") && "chart-active"}`}
                        >
                            2
                        </div>
                        <div
                            className={`${(status === "DELIVERY" || status === "WAITING" ||
                                status === "DELIVERED") && "chart-active"}`}
                        >
                            3
                        </div>
                        <div
                            className={`${(status === "WAITING" || status === "DELIVERED") && "chart-active"}`}
                        >
                            4
                        </div>
                        <div
                            className={`${status === "DELIVERED" && "chart-active"}`}
                        >
                            5
                        </div>
                    </div>
                    <Card className={"mt-2 p-2 ms-3 border-radius-10 shadow-sm"} style={{width: "20%"}}>
                        <div>
                            <div>1. Создано</div>
                            <div>2. Принято</div>
                            <div>3. Доставляется</div>
                            <div>4. Ожидает получения</div>
                            <div>5. Доставлено</div>
                        </div>
                    </Card>
                </div>
            }
            {(status === "RETURN" || status === "RETURNED") &&
                <div className={"d-flex justify-content-between"}>
                    <div className="chart-container">
                        <div
                            className={`${(status === "RETURN" || status === "RETURNED") && "chart-active"}`}
                        >
                            1
                        </div>
                        <div
                            className={`${status === "RETURNED" && "chart-active"}`}
                        >
                            2
                        </div>
                    </div>
                    <Card className={"mt-2 p-2 ms-3 border-radius-10 shadow-sm"} style={{width: "20%"}}>
                        <div>
                            <div>1. Возврат</div>
                            <div>2. Возвращено</div>
                        </div>
                    </Card>
                </div>
            }
        </div>
    );
};

export default OrderStatusChart;