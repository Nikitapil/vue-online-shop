import { mount } from '@vue/test-utils';
import LinkWithIcon from '../components/ui/LinkWithIcon.vue';

describe('LinkWithIcon tests', () => {
  test('should open tooltip on icon', async () => {
    const wrapper = mount(LinkWithIcon, {
      props: {
        icon: 'mdi:settings-outline',
        label: 'test-label',
        to: '/'
      },
      attachTo: 'body'
    });

    const spanTooltip = wrapper.find('[data-testid="span-tooltip"]');

    await spanTooltip.trigger('mouseleave');

    let tooltip = wrapper.find('.tooltip');

    expect(tooltip.isVisible()).toBe(false);

    await spanTooltip.trigger('mouseenter');

    tooltip = wrapper.find('.tooltip');

    expect(tooltip.isVisible()).toBe(true);
  });
});
