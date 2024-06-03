import { flushPromises, mount } from '@vue/test-utils';
import Uploader from '../components/ui/Uploader.vue';
import IconButton from '../components/ui/IconButton.vue';
import AppButton from '../components/ui/AppButton.vue';

describe('FileUploader', () => {
  const file = new File(['hello'], 'hello.jpg', { type: 'image/jpg' });
  test('should render the component', () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: '',
        disabled: false
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  test('render uploader button', () => {
    const label = 'Test label';
    const wrapper = mount(Uploader, {
      props: {
        label,
        id: 'test-id',
        name: 'test-name',
        rules: '',
        disabled: false
      }
    });

    const button = wrapper.findComponent(AppButton);
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe(label);
  });

  test('should render delete btn if value', () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: '',
        disabled: false,
        modelValue: file
      }
    });

    const iconButton = wrapper.findComponent(IconButton);
    expect(iconButton.exists()).toBe(true);
  });

  test('should render the error message after validation', async () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: 'requiredObj',
        disabled: false,
        modelValue: file,
        'onUpdate:modelValue': (e: File | null) => wrapper.setProps({ modelValue: e })
      }
    });

    await wrapper.setProps({ modelValue: null });

    await flushPromises();

    const errorMessage = wrapper.find('[data-testid="error-message"]');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Test-name is required');
  });

  test('should renders the uploaded image', () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: '',
        disabled: false,
        modelValue: file
      }
    });

    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
  });

  test('should call delete handler on delete button click', async () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: '',
        disabled: false,
        modelValue: file,
        'onUpdate:modelValue': (e: File | null) => wrapper.setProps({ modelValue: e })
      }
    });

    const iconButton = wrapper.findComponent(IconButton);
    await iconButton.trigger('click');

    expect(wrapper.props('modelValue')).toBe(null);
  });

  test('should set value by input', async () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: '',
        disabled: false,
        modelValue: null,
        'onUpdate:modelValue': (e: File | null) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find<HTMLInputElement>('input');

    // The way to create FileList structure
    const dt = new DataTransfer();
    dt.items.add(file);
    input.element.files = dt.files;

    await input.trigger('change');

    expect(wrapper.props('modelValue')).toBeTruthy();
  });

  test('should set null value by input', async () => {
    const wrapper = mount(Uploader, {
      props: {
        id: 'test-id',
        label: 'Test label',
        name: 'test-name',
        rules: '',
        disabled: false,
        modelValue: file,
        'onUpdate:modelValue': (e: File | null) => wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find<HTMLInputElement>('input');

    await input.trigger('change');

    expect(wrapper.props('modelValue')).toBe(null);
  });
});
