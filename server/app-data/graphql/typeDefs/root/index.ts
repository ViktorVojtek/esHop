import { gql } from 'apollo-server-express';

const rootTypeDefs = gql`
  scalar Object

  type Query {
    categories: [Category]
    currencies: [Currency]
    customer(id: String!): Customer
    customers: [Customer]
    deliveryMethode(id: String!): Delivery
    deliveryMethods: [Delivery]
    discount(id: String!): Discount
    discounts: [Discount]
    orders(id: String): [Order]
    order: Order
    paymentMethode(id: String!): Payment
    paymentMethodes: [Payment]
    products(categoryId: String, subCategoryId: String): [Product]
    loyalityProducts: [LoyalityProduct]
    product(id: String!): Product
    service(id: String!): Service
    services: [Service]
    subCategories(categoryId: String): [SubCategory]
    users: [User]
  }

  type Mutation {
    createCategory(title: String!): Category
    updateCategory(_id: String!, title: String!): Category
    removeCategory(_id: String!): String

    createCustomer(customerData: CustomerRegInput!): Customer
    updateCustomer(id: String!, customerData: CustomerRegInput!): Customer
    logInCustomer(customerData: CustomerLoginInput!): CustomerLogged
    removeCustomer(id: String!): String
    changeCustomerPassword(token: String!, password: String!): Customer
    changeCustomerZonePassword(
      id: String!
      oldPass: String!
      newPass: String!
    ): Customer

    createDeliveryMethode(
      isEnvelopeSize: Boolean
      title: String!
      value: String!
    ): Delivery
    removeDeliveryMethode(id: String): String

    createDiscount(code: String!, value: Int): Discount
    removeDiscount(id: String!): String

    createPaymentMethode(title: String!, value: Int!): Payment
    removePaymentMethode(id: String!): String

    createOrder(data: OrderInput!): String
    updateOrder(_id: String!, status: Int): Order
    updatePaymentStatus(_id: String!, paymentStatus: Int): Order

    setCurrency(currencyInput: CurrencyInput!): Currency
    updateCurrency(currencyUpdateInput: CurrencyUpdateInput!): Currency
    removeCurrency(_id: String!): String

    loginUser(userLoginInput: UserLoginInput!): UserLogged
    registerUser(userRegInput: UserRegInput!): User

    createProduct(productInput: ProductInput!): Product
    updateProduct(_id: String!, productInput: ProductInput!): Product
    removeProduct(_id: String!): String

    createLoyalityProduct(
      loyalityProductInput: LoyalityProductInput!
    ): LoyalityProduct
    updateLoyalityProduct(
      _id: String!
      loyalityProductInput: LoyalityProductInput!
    ): LoyalityProduct
    removeLoyalityProduct(_id: String!): String

    createSubCategory(categoryId: String!, title: String!): SubCategory
    removeSubCategory(_id: String!): String

    createService(serviceInput: ServiceInput!): Service
    updateService(_id: String!, serviceInput: ServiceInput!): Service
    removeService(_id: String!): String

    addToMarketingList(marketingListData: MarketingListInput!): MarketingList
    removeFromMarketingList(email: String!): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default rootTypeDefs;
