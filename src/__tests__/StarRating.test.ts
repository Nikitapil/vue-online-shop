import { flushPromises, mount } from '@vue/test-utils';
import StarRating from '../components/ui/StarRating.vue';

describe('StarRating tests', () => {
  test('Should change value correctly', async () => {
    const wrapper = mount(StarRating, {
      props: {
        name: 'star-rating',
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e })
      },
      attachTo: 'body'
    });

    const labels = wrapper.findAll('[data-testid="star-label"]');

    (labels[0].element as HTMLLabelElement).click();

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe(1);
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  test('Should render correct amount of stars', async () => {
    const wrapper = mount(StarRating, {
      props: {
        name: 'star-rating',
        count: 2,
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e })
      },
      attachTo: 'body'
    });

    const labels = wrapper.findAll('[data-testid="star-label"]');

    expect(labels.length).toBe(2);
  });

  test('Should be disabled by prop', async () => {
    const wrapper = mount(StarRating, {
      props: {
        name: 'star-rating',
        modelValue: 0,
        disabled: true,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e })
      },
      attachTo: 'body'
    });

    const labels = wrapper.findAll('[data-testid="star-label"]');

    (labels[0].element as HTMLLabelElement).click();

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe(0);
    expect(wrapper.emitted('change')).toBeFalsy();
  });
});
