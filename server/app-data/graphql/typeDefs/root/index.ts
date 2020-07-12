import { gql } from 'apollo-server-express';

const rootTypeDefs = gql`
  type Query {
    categories: [Category]
    currencies: [Currency]
    deliveryMethode(id: String!): Delivery
    deliveryMethods: [Delivery]
    discount(id: String!): Discount
    discounts: [Discount]
    orders: [Order]
    order: Order
    paymentMethode(id: String!): Payment
    paymentMethodes: [Payment]
    products(categoryId: String, subCategoryId: String): [Product]
    product(id: String!): Product
    subCategories(categoryId: String): [SubCategory]
    users: [User]
  }

  type Mutation {
    createCategory(title: String!): Category
    updateCategory(_id: String!, title: String!): Category
    removeCategory(_id: String!): String

    createDeliveryMethode(title: String!, value: String!): Delivery
    removeDeliveryMethode(id: String): String

    createDiscount(code: String!, value: Int): Discount
    removeDiscount(id: String!): String

    createPaymentMethode(title: String!, value: Int!): Payment
    removePaymentMethode(id: String!): String

    createOrder(data: OrderInput!): Order

    setCurrency(currencyInput: CurrencyInput!): Currency
    updateCurrency(currencyUpdateInput: CurrencyUpdateInput!): Currency
    removeCurrency(_id: String!): String

    loginUser(userLoginInput: UserLoginInput!): UserLogged
    registerUser(userRegInput: UserRegInput!): User

    createProduct(productInput: ProductInput!): Product
    updateProduct(_id: String!, productInput: ProductInput!): Product
    removeProduct(_id: String!): String

    createSubCategory(categoryId: String!, title: String!): SubCategory
    removeSubCategory(_id: String!): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default rootTypeDefs;
