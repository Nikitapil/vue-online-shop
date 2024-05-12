import { mount } from '@vue/test-utils';
import ProductDetails from '../components/products/ProductDetails.vue';
import { i18n } from '../plugins/i18n';
import ProductPrice from '../components/products/ProductPrice.vue';

describe('ProductDetails tests', () => {
  test('should not render product name', () => {
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {}
      }
    });
    const productName = wrapper.find('[data-testid="product-name"]');

    expect(productName.exists()).toBe(false);
  });

  test('should render product name', () => {
    const productNameText = 'Test Product';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText
        }
      }
    });
    const productName = wrapper.find('[data-testid="product-name"]');

    expect(productName.exists()).toBe(true);
    expect(productName.text()).toBe(productNameText);
  });

  test('should not render product img', () => {
    const productNameText = 'Test Product';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText
        }
      }
    });
    const productImg = wrapper.find('[data-testid="product-img"]');

    expect(productImg.exists()).toBe(false);

    const productImgFallback = wrapper.find('[data-testid="product-img-fallback"]');

    expect(productImgFallback.exists()).toBe(true);
    expect(productImgFallback.text()).toBe('No Image');
  });

  test('should render product img', () => {
    const productNameText = 'Test Product';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText,
          imageUrl: '123'
        }
      }
    });
    const productImg = wrapper.find('[data-testid="product-img"]');

    expect(productImg.exists()).toBe(true);

    const productImgFallback = wrapper.find('[data-testid="product-img-fallback"]');

    expect(productImgFallback.exists()).toBe(false);
  });

  test('should not render product description', () => {
    const productNameText = 'Test Product';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText
        }
      }
    });
    const productDescription = wrapper.find('[data-testid="product-description"]');

    expect(productDescription.exists()).toBe(false);
  });

  test('should render product description', () => {
    const productNameText = 'Test Product';
    const productDescriptionText = 'Test Description';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText,
          description: productDescriptionText
        }
      }
    });
    const productDescription = wrapper.find('[data-testid="product-description"]');

    expect(productDescription.exists()).toBe(true);
    expect(productDescription.text()).toBe(productDescriptionText);
  });

  test('should have product price component', () => {
    const productNameText = 'Test Product';
    const productDescriptionText = 'Test Description';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText,
          description: productDescriptionText
        }
      }
    });
    const productPriceComponent = wrapper.findComponent(ProductPrice);

    expect(productPriceComponent.exists()).toBe(true);
  });

  test('should not render product rating', () => {
    const productNameText = 'Test Product';
    const productDescriptionText = 'Test Description';
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText,
          description: productDescriptionText
        }
      }
    });
    const productRating = wrapper.find('[data-testid="product-rating"]');

    expect(productRating.exists()).toBe(false);
  });

  test('should render product rating', () => {
    const productNameText = 'Test Product';
    const productDescriptionText = 'Test Description';
    const productRatingValue = 4;
    const wrapper = mount(ProductDetails, {
      global: {
        plugins: [i18n]
      },
      props: {
        product: {
          name: productNameText,
          description: productDescriptionText,
          rating: productRatingValue
        }
      }
    });
    const productRating = wrapper.find('[data-testid="product-rating"]');

    expect(productRating.exists()).toBe(true);
    expect(productRating.text()).toBe(`Rating: ${productRatingValue}`);
  });
});
