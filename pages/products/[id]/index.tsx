import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/layout";
import styles from "@/styles/products.module.scss";
import { ProductsItem, API_URL } from "@/pages/products";
import axios from "axios";
import DOMPurify from "dompurify";

interface ItemProps {
  productsItem: ProductsItem;
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  const url = `${API_URL}/${params.id}`;
  const { data } = await axios.get<ProductsItem>(url);
  return {
    props: { productsItem: data },
  };
}

export default function Item({ productsItem }: ItemProps) {
  return (
    <Layout>
      <div className={styles.product}>
        <Link href="/products" className={styles.product__back}>
          <Image
            src="/svg/arrow-left.svg"
            width={20}
            height={20}
            alt="arrow left"
          />
          Назад
        </Link>
        <div className={styles.product__top}>
          <Image
            src={productsItem.picture}
            width={374}
            height={374}
            alt={productsItem.title}
          />
          <div className={styles.product__top_right}>
            <div>
              <h1 className={styles.product__title}>{productsItem.title}</h1>
              <div className={styles.product__rating}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < productsItem.rating
                        ? `${styles.product__rating_starFilled}`
                        : `${styles.product__rating_starEmpty}`
                    }
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.product__price}>
                {productsItem.price} &#8381;
              </div>
              <button
                type="button"
                className={styles.product__button}
                onClick={() => console.log(productsItem.id)}
              >
                Добавить в корзину
              </button>
            </div>
            <div>
              <div className={styles.product__undo}>
                <Image
                  src="/svg/undo.svg"
                  width={20}
                  height={20}
                  alt="arrow undo"
                />
                <p>Условия возврата</p>
              </div>
              <p>
                Обменять или вернуть товар надлежащего качества можно в течение
                14 дней с момента покупки.
              </p>
            </div>
            <p className={styles.product__subtext}>
              Цены в интернет-магазине могут отличаться от розничных магазинов.
            </p>
          </div>
        </div>
        <div className={styles.product__description}>
          <h3>Описание</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(productsItem.description),
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
