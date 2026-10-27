async function getProducts() {
  try {
    let response = await fetch("https://jsonbek.uz/api/products?style=comedy");
    console.log(response);
    if (!response.ok) {
      throw new Error("Products olib kelishda muommo yuzaga keld");
    }
    let data = await response.json();
    updateUi(data);
  } catch (erorr) {
    console.log(error);
  }
}
getProducts();
