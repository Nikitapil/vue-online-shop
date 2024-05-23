import { mount } from '@vue/test-utils';

import { ERoutesName } from '../router';

import { i18n } from '../plugins/i18n';

import LinkWithIcon from '../components/ui/LinkWithIcon.vue';
import AdminNav from '../modules/admin/components/AdminNav.vue';

describe('AdminNav.vue', () => {
  it('renders AdminNav with LinkWithIcon component', () => {
    const wrapper = mount(AdminNav, {
      global: {
        plugins: [i18n]
      }
    });

    const linkWithIconComponent = wrapper.findComponent(LinkWithIcon);

    expect(linkWithIconComponent.exists()).toBe(true);
    expect(linkWithIconComponent.props('icon')).toBe('arcticons:home-finance');
    expect(linkWithIconComponent.props('label')).toBe('Finance Settings');
    expect(linkWithIconComponent.props('to')).toEqual({ name: ERoutesName.FINANCE_SETTINGS });
  });
});
