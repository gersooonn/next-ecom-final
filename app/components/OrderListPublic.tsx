"use client";
import Image from "next/image";
import React from "react";
import dateFormat from "dateformat";
import { Chip } from "@material-tailwind/react";
import { formatPrice } from "../utils/helper";
import Status from "./Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";

type product = {
  id: string;
  title: string;
  thumbnail: string;
  totalPrice: number;
  price: number;
  qty: number;
  category: string;
  name: string;
};

export interface Orders {
  id: any;
  products: product[];
  paymentStatus: string;
  date: string;
  total: number;
  deliveryStatus: "encomendado" | "entregue" | "enviado";
  price: number
  createdAt: Date;
}

export default function OrderListPublic({ orders }: { orders: Orders[] }) {
  return (
    <div>
      {orders.map((order) => {
        return (
          <div key={order.id} className="py-4 space-y-4">
            <div>Order ID: {order.id}</div>
            <div>
              <div className="flex gap-2 items-center">
                <div>Payment Status:</div>
                <div>
                  {order.paymentStatus === "paid" ? (
                    <Status
                      text="pending"
                      icon={MdAccessTimeFilled}
                      bg="bg-slate-200"
                      color="text-slate-700"
                    />
                  ) : order.paymentStatus === "paid" ? (
                    <Status
                      text="completed"
                      icon={MdDone}
                      bg="bg-green-200"
                      color="text-green-700"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div>Delivery Status:</div>
                <div>
                  {order.deliveryStatus === "encomendado" ? (
                    <Status
                      text="pending"
                      icon={MdAccessTimeFilled}
                      bg="bg-slate-200"
                      color="text-slate-700"
                    />
                  ) : order.deliveryStatus === "enviado" ? (
                    <Status
                      text="dispatched"
                      icon={MdDeliveryDining}
                      bg="bg-purple-200"
                      color="text-purple-700"
                    />
                  ) : order.deliveryStatus === "entregue" ? (
                    <Status
                      text="delivered"
                      icon={MdDone}
                      bg="bg-green-200"
                      color="text-green-700"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div>Date: {moment(order.createdAt).fromNow()}</div>
              <hr />
              <div>
                <h2 className="font-semibold mt-5 mb-2">Products Order</h2>{" "}
                <hr />
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-5">
                  <div className="col-span-2 justify-self-start font-semibold">
                    PRODUCT
                  </div>
                  <div className="justify-self-center">PRICE</div>
                  <div className="justify-self-center">QTY</div>
                  <div className="justify-self-end">TOTAL</div>
                </div>
              </div>
            </div>
            {order.products.map((p) => {
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t[1.5px] border-slate-200 py-2 items-center"
                >
                  <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                    <div className="relative w-[70px] aspect-square">
                      <Image src={p.thumbnail} fill alt={p.title} />
                    </div>
                    <div>
                      <div className="flex flex-col gap-1">
                        <p>{p.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="justify-self-center">
                    {formatPrice(p.price)}
                  </div>
                  <div className="justify-self-center">{p.qty}</div>
                  <div className="justify-self-end font-semibold">
                    {formatPrice(p.price)}
                  </div>
                </div>
              );
            })}
            <div className="text-right p-2 border-t border-b">
              <p>Encomendado: {dateFormat(order.date, "dd/mm/yyyy")}</p>
              <p>
                Status do pedido:{" "}
                <span className="font-semibold uppercase">
                  {order.deliveryStatus}
                </span>
              </p>
              <p>TOTAL {formatPrice(order.total)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
