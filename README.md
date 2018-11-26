Metapro
=======

Metapro is a firefox extension to make a todos list for each product.
This is an experiment if I could make an app entirely without any server using
metafields. This is a complete app install using oauth and storing state in
metafields.

**Because I can.**

### Development
- You will need to ask me for my `.env` file to use this.
- Run `npm run build`
- Open `about:debugging#addons` in your firefox and click `Load Temporary Add-on`
  then find and click on the `extension/manifest.json` file. Then login to your shopify
  store, and load up a product view.

## Things learned
- I would want permission based on namespace
- Doing a get request and query by namespace would be good

## Things I might try
- move to graphql so that updating multiple items is faster
