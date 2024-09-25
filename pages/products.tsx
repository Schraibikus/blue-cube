import axios from "axios";
import Image from "next/image";

import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import styles from "@/styles/products.module.scss";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { currentPage, nextPage } from "@/store/pageSlice";

export const API_URL = "https://skillfactory-task.detmir.team/products";

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
  const LIMIT_PAGES = 14;

  const dispath = useAppDispatch();
  const page = useAppSelector((state) => state.page.page);

  const nextPages = () => {
    dispath(nextPage(1));
  };

  const undoPages = () => {
    dispath(nextPage(-1));
  };

  const { push } = useRouter();

  const [items, setItems] = useState<ProductsItem[]>([]);
  const [loading, setLoading] = useState(true); //убрать на финале - нужно только для отладки

  const load = async (page: number) => {
    try {
      const itemsResponse = await axios.get(`${API_URL}?page=${page}&limit=15`);
      setItems(itemsResponse.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); //убрать на финале - нужно только для отладки
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  //убрать на финале - нужно только для отладки
  if (loading) {
    return <Layout>... loading ...</Layout>;
  }

  function createButtons() {
    const buttons = [];
    for (let i = 0; i < LIMIT_PAGES; i++) {
      buttons.push(
        <button
          key={i}
          className={`${styles.pagination__button}${
            i + 1 === page ? ` ${styles.pagination__button_active}` : ""
          }`}
          onClick={() => handleButton(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  }
  function handleButton(page: number) {
    dispath(currentPage(page));
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
          items.map((elem) => (
            <div
              key={elem.id}
              className={styles.card}
              data-id={elem.id} //убрать на финале - нужно только для отладки
              onClick={() => push(`/products/${elem.id}`)}
            >
              <Image
                src={elem.picture}
                alt={truncateText(elem.title, 2)}
                width={250}
                height={250}
                onError={() => {
                  const imageElement = document.querySelector(
                    `.card[data-id="${elem.id}"] img`
                  );
                  if (imageElement) {
                    (imageElement as HTMLImageElement).src = "/not-image.jpg";
                  }
                }}
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
          <div>No items found</div>
        )}
      </div>
      <section className={styles.pagination}>
        <button
          className={styles.pagination__button}
          type="button"
          disabled={page === 1}
          onClick={() => undoPages()}
        >
          <Image
            src="/svg/arrow-left.svg"
            width={20}
            height={20}
            alt="arrow left"
          />
        </button>
        {createButtons()}
        <button
          className={styles.pagination__button}
          type="button"
          disabled={page === LIMIT_PAGES}
          onClick={() => nextPages()}
        >
          <Image
            src="/svg/arrow-right.svg"
            width={20}
            height={20}
            alt="arrow right"
          />
        </button>
      </section>
    </Layout>
  );
}
