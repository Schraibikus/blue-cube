import Layout from "@/components/layout/layout";
import axios from "axios";

export default function Orders() {
  const API_URL =
    "https://skillfactory-task.detmir.team/products?page=1&limit=200";
  async function getProducts() {
    const { data } = await axios.get(API_URL);
    console.log(data);
  }

  return (
    <Layout>
			<h1>Orders</h1>
      <button type="button" onClick={getProducts}>
        Get data
      </button>
    </Layout>
  );
}