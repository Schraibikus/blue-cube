import { PropsWithChildren } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";

import "@/styles/globals.scss";
import styles from "@/components/layout/layout.module.scss";
import { useAppSelector } from "@/hooks/redux";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const cartCount = useAppSelector((state) => state.cart.cartItems.length);

  return (
    <>
      <Head>
        <title>Blue Cube</title>
        <meta name="description" content="SkillFactory Next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/">
            <Image
              src="/svg/brand.svg"
              alt="logo"
              width={150}
              height={24}
              priority
            />
          </Link>
          <div className={styles.navigation}>
            <Link
              href="/products"
              className={clsx(
                styles.navigation__link,
                router.pathname === "/products" &&
                  styles.navigation__link_active
              )}
            >
              Товары
            </Link>
            <Link
              href="/orders"
              className={clsx(
                styles.navigation__link,
                router.pathname === "/orders" && styles.navigation__link_active
              )}
            >
              Заказы
            </Link>
          </div>
          <Link
            href="/cart"
            className={clsx(
              styles.cart,
              router.pathname === "/cart" && styles.navigation__link_active
            )}
          >
            <Image
              src="/svg/cart.svg"
              alt="cart"
              width={20}
              height={20}
              priority
            />
            Корзина
            {cartCount === 0 ? (
              ""
            ) : (
              <span className={styles.cartCount}>({cartCount})</span>
            )}
          </Link>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
