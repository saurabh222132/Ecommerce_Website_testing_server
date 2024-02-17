export function fetchProductByCategory(category) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "https://dummyjson.com/products/category/" + category,
      {}
    );
    const data = await response.json();

    resolve({ data });
  });
}
