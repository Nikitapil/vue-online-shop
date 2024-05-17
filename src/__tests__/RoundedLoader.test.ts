import { mount } from '@vue/test-utils';
import RoundedLoader from '../components/ui/loaders/RoundedLoader.vue';

describe('RoundedLoader tests', () => {
  test('Should have default size class of md', () => {
    const wrapper = mount(RoundedLoader);

    const loader = wrapper.find('[data-testid="rounded-loader"]');

    expect(loader.classes()).toContain('md');
  });

  test('Should have size class of sm if prop provided', () => {
    const wrapper = mount(RoundedLoader, {
      props: {
        size: 'sm'
      }
    });

    const loader = wrapper.find('[data-testid="rounded-loader"]');

    expect(loader.classes()).toContain('sm');
  });
});
