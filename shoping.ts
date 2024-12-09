// Abstract Class for Payment
abstract class Payment {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  abstract processPayment(): void;
}

// Subclasses for Payment
class Cash extends Payment {
  cashTendered: number;

  constructor(amount: number, cashTendered: number) {
    super(amount);
    this.cashTendered = cashTendered;
  }

  processPayment(): void {
    console.log(`Processing cash payment of ${this.amount}`);
  }
}

class Check extends Payment {
  bankID: string;
  authorized: boolean;

  constructor(amount: number, bankID: string, authorized: boolean) {
    super(amount);
    this.bankID = bankID;
    this.authorized = authorized;
  }

  processPayment(): void {
    if (this.authorized) {
      console.log(`Processing check payment of ${this.amount}`);
    } else {
      console.log("Check not authorized");
    }
  }
}

class Credit extends Payment {
  number: string;
  type: string;
  expDate: string;

  constructor(amount: number, number: string, type: string, expDate: string) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }

  processPayment(): void {
    console.log(`Processing credit payment of ${this.amount}`);
  }
}

// Item Class
class Item {
  shippingWeight: number;
  description: string;

  constructor(shippingWeight: number, description: string) {
    this.shippingWeight = shippingWeight;
    this.description = description;
  }

  getPriceForQuantity(quantity: number): number {
    return 10 * quantity; // Example price logic
  }

  getTax(): number {
    return 0.07; // Example tax rate
  }

  inStock(): boolean {
    return true; // Example stock logic
  }
}

// OrderDetail Class
class OrderDetail {
  quantity: number;
  taxStatus: string;
  item: Item;

  constructor(quantity: number, taxStatus: string, item: Item) {
    this.quantity = quantity;
    this.taxStatus = taxStatus;
    this.item = item;
  }

  calcSubTotal(): number {
    return this.item.getPriceForQuantity(this.quantity);
  }

  calcTax(): number {
    return this.calcSubTotal() * this.item.getTax();
  }

  calcWeight(): number {
    return this.quantity * this.item.shippingWeight;
  }
}

// Order Class
class Order {
  date: Date;
  status: string;
  orderDetails: OrderDetail[] = [];

  constructor(date: Date, status: string) {
    this.date = date;
    this.status = status;
  }

  addOrderDetail(orderDetail: OrderDetail): void {
    this.orderDetails.push(orderDetail);
  }

  calcTotal(): number {
    return this.orderDetails.reduce((total, detail) => total + detail.calcSubTotal() + detail.calcTax(), 0);
  }

  calcTotalWeight(): number {
    return this.orderDetails.reduce((total, detail) => total + detail.calcWeight(), 0);
  }
}

// Customer Class
class Customer {
  name: string;
  address: string;
  orders: Order[] = [];

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }
}

// Example Usage
const item1 = new Item(2, "Board Game");
const orderDetail1 = new OrderDetail(5, "Taxable", item1);

const order = new Order(new Date(), "Pending");
order.addOrderDetail(orderDetail1);

const customer = new Customer("John Doe", "123 Street");
customer.addOrder(order);

console.log(`Customer: ${customer.name}`);
console.log(`Order Total: ${order.calcTotal()}`);
console.log(`Order Total Weight: ${order.calcTotalWeight()}`);
