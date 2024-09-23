import axios from "axios";
import Image from "next/image";

import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import styles from "@/styles/products.module.scss";
import { useRouter } from "next/router";

export const API_URL =
  "https://skillfactory-task.detmir.team/products?page=1&limit=50";

export interface ProductsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  picture: string;
  rating: number;
  price: number;
}

export default function Products() {
  const { push } = useRouter();

  const [items, setItems] = useState<ProductsItem[]>([]);
  const [loading, setLoading] = useState(true); //убрать на финале - нужно только для отладки

  const load = async () => {
    try {
      const data = await axios.get(API_URL);
      items.push(data.data.data);
      setItems([...items]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); //убрать на финале - нужно только для отладки
    }
  };

  useEffect(() => {
    load();
  }, []);

  //убрать на финале - нужно только для отладки
  if (loading) {
    return <Layout>... loading ...</Layout>;
  }

  function truncateText(text: string, limit: number): string {
    return (
      text.split(" ").slice(0, limit).join(" ") +
      (text.split(" ").length > limit ? "..." : "")
    );
  }

  return (
    <Layout>
      <div className={styles.products}>
        {items.length ? (
          items.flat().map((elem) => (
            <div
              key={elem.id}
              className={styles.card}
              onClick={() => push(`/products/${elem.id}`)}
            >
              <Image
                src={elem.picture}
                alt={truncateText(elem.title, 2)}
                width={250}
                height={250}
                priority
              />

              <div className={styles.card__title}>{elem.title}</div>
              <div className={styles.card__rating}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < elem.rating
                        ? `${styles.card__rating_starFilled}`
                        : `${styles.card__rating_starEmpty}`
                    }
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className={styles.card__price}>{elem.price} &#8381;</div>
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </Layout>
  );
}
