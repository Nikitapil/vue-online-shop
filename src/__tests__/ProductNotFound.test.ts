import { mount } from '@vue/test-utils';
import ProductNotFound from '../components/products/ProductNotFound.vue';
import { i18n } from '../plugins/i18n';

describe('ProductNotFound test', () => {
  test('Should render product not found test', () => {
    const wrapper = mount(ProductNotFound);

    const notFoundTextComponent = wrapper.find('[data-testid="not-found-text"]');
    const text = i18n.global.t('product_not_found');

    expect(notFoundTextComponent.text()).toBe(text);
  });
});
