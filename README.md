## Artist Storefront
<img width="1600" alt="grid-cover-template" src="https://user-images.githubusercontent.com/25517492/197372101-c2c1d9f1-b930-495e-a693-28f9bdbf0570.png">
Demo Link: https://wr-store-frontend-dev.herokuapp.com/

## About
### Participants
David White
- GitHub: dwight9339
- Discord: Dwight

### Description
Storefront for store.winterriddle.com. Built with NextJS, it implements a simple interface for users to browse and learn about products, add products to a cart, and checkout. The storefront uses a Medusa backend (located [here](https://github.com/dwight9339/wr-backend)) which implements a custom fulfillment provider for processing order fulfillment with Shippo, a custom payment provider which uses the Stripe hosted checkout api to provide a simple, secure payment experience, and a custom api endpoint for fetching the record of an anonymous customer to allow customers to checkout without creating an account.

### Preview
<!-- ![browsing_catalog](https://user-images.githubusercontent.com/25517492/197373177-5cf63929-0c63-4992-a102-91d9d64ed240.gif | width=200) -->
<img src="https://user-images.githubusercontent.com/25517492/197373177-5cf63929-0c63-4992-a102-91d9d64ed240.gif" width="600" />
<!-- ![product_page](https://user-images.githubusercontent.com/25517492/197373189-51efdd11-1512-4256-8d79-4ae4fe6a0108.png | width=200) -->
<img src="https://user-images.githubusercontent.com/25517492/197373189-51efdd11-1512-4256-8d79-4ae4fe6a0108.png" width="600" />
<!-- ![add_product_to_cart](https://user-images.githubusercontent.com/25517492/197373190-cd1d0c73-9262-4818-b789-089513aa9b89.gif | width=200) -->
<img src="https://user-images.githubusercontent.com/25517492/197373190-cd1d0c73-9262-4818-b789-089513aa9b89.gif" width="600" />
<!-- ![checkout_page](https://user-images.githubusercontent.com/25517492/197373195-d499d426-6601-45ff-b635-6ff3e4ee0820.png | width=200) -->
<img src="https://user-images.githubusercontent.com/25517492/197373195-d499d426-6601-45ff-b635-6ff3e4ee0820.png" width="600" />

## Set Up Project
### Prerequisites
- [Node.js](https://nodejs.org/en/) v14 or greater installed on your machine
- A Stripe account
- A Shippo account

### Install Project
1. Clone the custom backend server project found [here](https://github.com/dwight9339/wr-backend)
2. Create a postgres database and a .env file as described [here](https://docs.medusajs.com/usage/configurations). Also include a variable called STRIPE_API_KEY which will contain your Stripe secret key as well as one called SHIPPO_API_KEY which will, of course, hold your Shippo API key.
3. Install the file storage solution plugin of your choice. I went with [S3](https://docs.medusajs.com/add-plugins/s3).
4. Clone the Medusa admin app found [here](https://github.com/dwight9339/medusa_admin) and use it to set up your store. It's the same as the official Medusa admin app except in how it creates shipping options. Make sure to create a region and add the Shippo and Stripe providers. Create a shipping option named Shippo that uses the Shippo fulfillment method.
5. Clone the storefront app found from this repository. Create a .env.local file in the root folder with the following variables:
`
NEXT_PUBLIC_BACKEND_HOST=<URL of backend server>
SHIPPO_API_KEY=<Shippo API key>
SHIPPO_FROM_ADDRESS=<ID of address created in Shippo API that you would like to use as a from address for shipping>
IMAGE_DOMAIN=<Image domain where product photos are hosted>
`

## Resources
- [Medusa’s GitHub repository](https://github.com/medusajs/medusa)
- [Medusa Admin Panel](https://github.com/medusajs/admin)
- [Medusa Documentation](https://docs.medusajs.com/)
