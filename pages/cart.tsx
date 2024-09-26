import Layout from "@/components/layout/layout";
import { useAppSelector } from "@/hooks/redux";
import { fetchCartItems } from "@/store/cartSlice";
import { useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/products.module.scss";
import s from "@/styles/cart.module.scss";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cartItems);
  // console.log("cart in Cart: ", cart);

  useEffect(() => {
    fetchCartItems();
  }, []);

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
                  // onClick={() => setQuantity(quantity - 1)}
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
                  // onClick={() => setQuantity(quantity + 1)}
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
              <p className={s.cart__item_price}>{item.product.price} &#8381;</p>
            </div>
          ))}
          <div className={s.cart__total}>
            <p className={s.cart__total_title}>Итого</p>
            <p className={s.cart__total_price}>{14597} &#8381;</p>
          </div>
          <button type="button" className={s.cart__button}>
            Оформить заказ
          </button>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </Layout>
  );
}
