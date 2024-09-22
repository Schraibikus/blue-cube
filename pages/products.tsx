import axios from "axios";
import Image from "next/image";
// import DOMPurify from "dompurify";

import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import "@/styles/globals.scss";
import styles from "@/styles/products.module.scss";

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
  const [items, setItems] = useState<ProductsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await axios.get(API_URL);
      // console.log("data", data);
      items.push(data.data.data);
      setItems([...items]);
      console.log(items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <Layout>... loading ...</Layout>;
  }

  // async function getProducts() {
  //   const { data } = await axios.get(API_URL);
  //   items.push(data.data);
  //   setItems([...items]);
  //   console.log(items);
  // }

  return (
    <Layout>
      {/* <button type="button" onClick={getProducts}>
        Get data
      </button> */}
      <div className={styles.products}>
        {items.length ? (
          items.flat().map((elem) => (
            <div key={elem.id} className={styles.product}>
              <Image
                src={elem.picture}
                alt={elem.title}
                width={200}
                height={200}
                loading="lazy"
              />
              <p>{elem.title}</p>
              {/* <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(elem.description),
                  }}
                ></div>
                <div>{elem.rating}</div> */}
              <div>
                Рейтинг:
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < elem.rating ? "star-filled" : "star-empty"}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div>{elem.price} &#8381;</div>
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </Layout>
  );
}
