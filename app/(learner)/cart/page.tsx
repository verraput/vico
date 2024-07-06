"use client";
import CartCard from "@/components/CartCard";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import { getCartAsync, selectCart } from "@/lib/features/learner/learnerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  const profile = useAppSelector(selectLogin);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        if (profile.user_type === null || profile.user_type === "") {
          dispatch(getProfileAsync());
        }
      } else {
        router.replace("/login");
      }
    }
    dispatch(getCartAsync());
  }, []);

  const totalPrice = (carts: typeof cart) => {
    const price = carts.data.reduce(
      (total, cart) => total + cart.course.price,
      0
    );
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="container flex mx-auto pt-4 pb-10 px-5 bg-base-300 gap-5">
      <div className="grow">
        <h2 className="text-3xl font-medium border-b pb-4 border-b-base-200">
          Shipping Cart
        </h2>

        <div className="space-y-4 mt-5">
          {cart.data.length === 0 && (
            <div className="text-center">
              <h3 className="text-2xl font-medium">Cart is Empty</h3>
              <p className="text-lg">Please add some courses to your cart</p>
            </div>
          )}
          {cart.data.map((item, index) => (
            <CartCard
              id={item.id}
              course={item.course}
              user_id={item.user_id}
              course_id={item.course_id}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              key={`cart-${item.course_id}-${index}`}
            />
          ))}
        </div>
      </div>
      <div className="sticky top-16 h-fit">
        <h4 className="text-2xl font-medium">Total:</h4>
        <h5 className="text-3xl font-semibold">{totalPrice(cart)}</h5>
        <Link href={"/cart/asdasd/checkout"}>
          <button className="btn btn-primary btn-wide mt-5">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
