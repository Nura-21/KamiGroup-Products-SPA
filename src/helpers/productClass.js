export default class Product {
  constructor(
    id = null,
    name = null,
    description = null,
    descriptionHTML = null,
    price = null,
    imgArray = [],
    isActive = true,
    isPriceGeneral = true,
    priceArray = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.descriptionHTML = descriptionHTML;
    this.price = price;
    this.imgArray = imgArray;
    this.isActive = isActive;
    this.isPriceGeneral = isPriceGeneral;
    this.priceArray = priceArray;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setDescriptionHTML(descriptionHTML) {
    this.descriptionHTML = descriptionHTML;
  }

  setPrice(price) {
    this.price = price;
  }

  setStatus(status) {
    this.isActive = status;
  }

  validateName() {
    return (
      this.name &&
      this.name.length > 0 &&
      /(^[A-Z]|[А-Я])([A-Za-z]|[А-Яа-я]{2})/.test(this.name)
    );
  }

  validateDescription() {
    return this.description.length > 0;
  }

  validatePrice() {
    return this.price > 0 && /[0-9]+/.test(this.price);
  }
}
