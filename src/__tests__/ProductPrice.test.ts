import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import ProductPrice from '../components/products/ProductPrice.vue';
import Price from '../modules/app/components/Price.vue';

describe('ProductPrice test', () => {
  test('should not render price components if no prices', () => {
    const wrapper = mount(ProductPrice, {
      props: {
        product: {}
      }
    });

    const priceComponents = wrapper.findAllComponents(Price);

    expect(priceComponents.length).toBe(0);
  });

  test('should not render discount block', () => {
    const wrapper = mount(ProductPrice, {
      global: {
        plugins: [createTestingPinia()]
      },
      props: {
        product: {
          price: 123,
          priceWithDiscount: 123
        }
      }
    });

    const priceComponents = wrapper.findAllComponents(Price);
    const discountBlock = wrapper.find('[data-testid="discount-block"]');

    expect(priceComponents.length).toBe(1);
    expect(discountBlock.exists()).toBe(false);
  });

  test('should render discount block', () => {
    const percentage = 5;
    const wrapper = mount(ProductPrice, {
      global: {
        plugins: [createTestingPinia()]
      },
      props: {
        product: {
          price: 150,
          priceWithDiscount: 123,
          discount: {
            percentage: percentage
          }
        }
      }
    });

    const priceComponents = wrapper.findAllComponents(Price);
    const discountBlock = wrapper.find('[data-testid="discount-block"]');
    const discountText = wrapper.find('[data-testid="discount-percentage"]');

    expect(priceComponents.length).toBe(2);
    expect(discountBlock.exists()).toBe(true);
    expect(discountText.text()).toBe(`-${percentage}%`);
  });

  test('should not render original price', () => {
    const percentage = 5;
    const wrapper = mount(ProductPrice, {
      global: {
        plugins: [createTestingPinia()]
      },
      props: {
        product: {
          priceWithDiscount: 123,
          discount: {
            percentage: percentage
          }
        }
      }
    });

    const priceComponents = wrapper.findAllComponents(Price);
    const originalPrice = wrapper.find('[data-testid="original-price"]');

    expect(priceComponents.length).toBe(1);
    expect(originalPrice.exists()).toBe(false);
  });
});
