import { flushPromises, mount } from '@vue/test-utils';

import { i18n } from '../plugins/i18n';

import { EPaginationLimits } from '../domain/components';

import ProductsPagination from '../components/products/ProductsPagination.vue';

describe('ProductsPagination', () => {
  const createWrapper = (totalCount: number) => {
    const wrapper = mount(ProductsPagination, {
      global: {
        plugins: [i18n]
      },
      props: {
        limitValue: EPaginationLimits.TEN,
        page: 1,
        totalCount: totalCount,
        isLoading: false
      }
    });
    return wrapper;
  };

  test('should not render any pagination buttons', () => {
    const wrapper = createWrapper(5);

    const paginationBtns = wrapper.findAll('[data-testid="pagination-button"]');

    expect(paginationBtns.length).toBe(0);
  });

  test('should render 2 pagination buttons', () => {
    const wrapper = createWrapper(15);

    const paginationBtns = wrapper.findAll('[data-testid="pagination-button"]');

    expect(paginationBtns.length).toBe(2);
  });

  test('should not render limit select', () => {
    const wrapper = createWrapper(9);

    const limitSelect = wrapper.find('[data-testid="limitSelect"]');

    expect(limitSelect.exists()).toBe(false);
  });

  test('should render limit select', () => {
    const wrapper = createWrapper(12);

    const limitSelect = wrapper.find('[data-testid="limitSelect"]');

    expect(limitSelect.exists()).toBe(true);
  });

  test('should emit paginate event on change page', async () => {
    const wrapper = createWrapper(12);

    const paginationBtns = wrapper.findAll('[data-testid="pagination-button"]');

    await paginationBtns[1].trigger('click');

    expect(wrapper.emitted('paginate')).toBeTruthy();
  });

  test('should emit paginate event on change limit', async () => {
    const wrapper = createWrapper(12);

    const limitSelect = wrapper.find('[data-testid="app-select"]');

    const opts: any = limitSelect.findAll('option');
    await opts?.at(1)?.setSelected();

    await flushPromises();

    expect(wrapper.emitted('paginate')).toBeTruthy();
  });
});
