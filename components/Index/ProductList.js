import { Card } from "semantic-ui-react";

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `Rs.${product.price}`,
      color: "blue",
      className:"shoppingcard",
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }));
  }

  return (
    <Card.Group
      stackable
      itemsPerRow="4"
      centered
      items={mapProductsToItems(products)}
    />
  );
}

export default ProductList;
