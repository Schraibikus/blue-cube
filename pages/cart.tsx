import Layout from "@/components/layout/layout";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import styles from "@/styles/products.module.scss";
import s from "@/styles/cart.module.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { CartItem } from "@/store/cartSlice";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cartItems);
  // console.log("cart in Cart: ", cart);
  // const dispatch = useAppDispatch();

  // const [cart, setCart] = useState<CartItem[]>([]);

  // const API_URL = "https://skillfactory-task.detmir.team/cart";

  // useEffect(() => {
  //   async function getProducts() {
  //     try {
  //       const { data } = await axios.get(API_URL);
  //       setCart(data);
  //       console.log(data);
  //     } catch (error) {
  //       alert("Ошибка при запросе данных ;(");
  //       console.error(error);
  //     }
  //   }
  //   getProducts();
  // }, []);

  const totalPrice = cart
    .flat()
    .reduce((sum, obj) => obj.product.price * obj.quantity + sum, 0);

  return (
    <Layout>
      {cart.length ? (
        <div className={s.cart}>
          {cart.flat().map((item) => (
            <div key={item.product.id} className={s.cart__item}>
              <Image
                src={item.product.picture}
                width={52}
                height={52}
                alt={item.product.title}
              />
              <p className={s.cart__item_title}>{item.product.title}</p>
              <div className={styles.product__ordersBlock_wrapper}>
                <button
                  type="button"
                  className={styles.product__ordersBlock_btn}
                  // onClick={() =>
                  //   dispatch(
                  //     updateQuantity({
                  //       id: item.product.id,
                  //       quantity: item.quantity - 1,
                  //     })
                  //   )
                  // }
                  // disabled={quantity === 0}
                >
                  <svg
                    width="14"
                    height="4"
                    viewBox="0 0 14 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8331 3.45834L1.16645 3.45834C-0.0221827 3.45834 -0.096039 0.541672 1.16645 0.541672L12.8331 0.541673C14.0217 0.541673 14.0956 3.45834 12.8331 3.45834Z"
                      fill="#0073E6"
                    />
                  </svg>
                </button>
                <span className={styles.product__ordersBlock_count}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  className={styles.product__ordersBlock_btn}
                  // onClick={() =>
                  //   dispatch(
                  //     updateQuantity({
                  //       id: item.product.id,
                  //       quantity: item.quantity + 1,
                  //     })
                  //   )
                  // }
                  // disabled={quantity === 10}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="#0073E6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.81036 0.397435C7.39834 0.242359 6.60122 0.242359 6.1892 0.397435C5.56371 0.632852 5.54145 1.22259 5.54145 1.79167V5.54167L1.16645 5.54167C-0.0960391 5.54167 -0.0221826 8.45834 1.16645 8.45834L5.54145 8.45834V12.2083C5.54145 12.7774 5.56371 13.3672 6.1892 13.6026C6.60122 13.7577 7.39834 13.7577 7.81036 13.6026C8.43585 13.3672 8.45811 12.7774 8.45811 12.2083V8.45834L12.8331 8.45834C14.0956 8.45834 14.0217 5.54168 12.8331 5.54167L8.45811 5.54167V1.79167C8.45811 1.22259 8.43585 0.632853 7.81036 0.397435Z"
                      fill="#0073E6"
                    />
                  </svg>
                </button>
              </div>
              {item.quantity === 0 && (
                <p className={s.cart__item_delete}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3335 1.91667C12.3335 1.07964 11.8628 0.666672 11.0835 0.666672H6.91687C6.13756 0.666672 5.66687 1.07964 5.66687 1.91667C5.66687 2.75371 6.13756 3.16667 6.91687 3.16667L11.0835 3.16667C11.8628 3.16667 12.3335 2.75371 12.3335 1.91667ZM0.66748 5.45834C0.66748 4.37789 1.12306 4.00001 2.12581 4.00001H15.8758C16.8786 4.00001 17.3341 4.37789 17.3341 5.45834C17.3341 6.83352 16.3462 6.91667 15.2502 6.91667V13.3333C15.2502 15.5425 13.4593 17.3333 11.2502 17.3333H6.7502C4.54106 17.3333 2.7502 15.5425 2.7502 13.3333V6.91667C1.65451 6.91667 0.66748 6.83285 0.66748 5.45834ZM9.7502 7.66668C9.7502 7.25247 9.41442 6.91668 9.0002 6.91668C8.58599 6.91668 8.2502 7.25247 8.2502 7.66668L8.2502 13.6667C8.2502 14.0809 8.58599 14.4167 9.0002 14.4167C9.41442 14.4167 9.7502 14.0809 9.7502 13.6667V7.66668ZM5.30404 6.92183C5.71769 6.90015 6.07059 7.21791 6.09227 7.63155L6.40628 13.6233C6.42796 14.037 6.11021 14.3899 5.69656 14.4116C5.28292 14.4332 4.93002 14.1155 4.90834 13.7018L4.59432 7.71006C4.57264 7.29641 4.8904 6.94351 5.30404 6.92183ZM13.4062 7.71005C13.4279 7.2964 13.1101 6.9435 12.6965 6.92182C12.2828 6.90014 11.9299 7.2179 11.9082 7.63154L11.5942 13.6233C11.5725 14.037 11.8903 14.3899 12.3039 14.4115C12.7176 14.4332 13.0705 14.1155 13.0922 13.7018L13.4062 7.71005Z"
                      fill="#ED2C19"
                    />
                  </svg>
                  Удалить
                </p>
              )}
              {item.quantity > 1 && (
                <div className={s.cart__item_priceDescription}>
                  <p className={s.cart__item_supPrice}>
                    {item.product.price} &#8381; за шт.
                  </p>
                  <p className={s.cart__item_price}>
                    {item.product.price * item.quantity} &#8381;
                  </p>
                </div>
              )}
              {item.quantity === 1 && (
                <p className={s.cart__item_price}>
                  {item.product.price} &#8381;
                </p>
              )}
            </div>
          ))}
          <div className={s.cart__total}>
            <p className={s.cart__total_title}>Итого</p>
            <p className={s.cart__total_price}>{totalPrice} &#8381;</p>
          </div>
          <button
            type="button"
            className={s.cart__button}
            disabled={totalPrice === 0}
          >
            Оформить заказ
          </button>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </Layout>
  );
}
