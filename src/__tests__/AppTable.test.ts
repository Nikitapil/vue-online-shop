import { flushPromises, mount } from '@vue/test-utils';
import AppTable from '../components/ui/AppTable/AppTable.vue';

describe('AppTable tests', () => {
  const columns = [{ key: 'firstColumn' }, { key: 'secondColumn' }, { key: 'thirdColumn' }];

  test('should render correct number of columns', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        dataSource: []
      }
    });

    const cols = wrapper.findAll('[data-testid="table-column"]');

    expect(cols.length).toBe(3);
  });

  test('should render correct number of rows', () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        dataSource: [{ key: 'firstRow' }, { key: 'secondRow' }, { key: 'thirdRow' }]
      }
    });

    const cols = wrapper.findAll('[data-testid="table-row"]');

    expect(cols.length).toBe(3);
  });

  test('should not emit sort event if column no sortable', async () => {
    const wrapper = mount(AppTable, {
      props: {
        columns,
        dataSource: []
      }
    });

    const col = wrapper.find('[data-testid="table-column"]');

    await col.trigger('click');
    await flushPromises();

    expect(wrapper.emitted('sort')).toBeFalsy();
  });

  test('should emit sort event if column is sortable', async () => {
    const wrapper = mount(AppTable, {
      props: {
        columns: [{ key: 'sortingColumn', sortable: true }, ...columns],
        dataSource: [],
        sort: '',
        'onUpdate:sort': (e: string) => wrapper.setProps({ sort: e })
      }
    });

    const col = wrapper.find('[data-testid="table-column"]');

    await col.trigger('click');
    await flushPromises();

    expect(wrapper.emitted('sort')).toBeTruthy();
    expect(wrapper.emitted('sort')[0][0]).toBe('sortingColumn');
    expect(wrapper.props('sort')).toBe('sortingColumn');

    const updatedCol = wrapper.find('[data-testid="table-column"]');

    expect(updatedCol.classes()).toContain('bg-blue-200');
  });
});
