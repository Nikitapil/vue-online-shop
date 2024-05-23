import { mount } from '@vue/test-utils';
import { DirectivePlugin } from '../directives/directive-plugin';
import LinkWithIcon from '../components/ui/LinkWithIcon.vue';

describe('LinkWithIcon tests', () => {
  test('should open tooltip on icon', async () => {
    const wrapper = mount(LinkWithIcon, {
      global: {
        plugins: [DirectivePlugin]
      },
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

    tooltip = wrapper.find('.tooltip');

    await spanTooltip.trigger('mouseenter');

    tooltip = wrapper.find('.tooltip');

    expect(tooltip.isVisible()).toBe(true);
  });
});
