import { ref } from 'vue';
import { useProduct } from '../composables/useProduct';
import { product } from './mocks/product-mocks';

describe('useProduct test', () => {
  test('should return null if null value passed', () => {
    const product = ref(null);
    const result = useProduct(product);

    expect(result.value).toBeNull();
  });

  test('should return product with correct url', () => {
    const productValue = ref(product);
    const result = useProduct(productValue);

    expect(result.value.imageUrl).toBe('http://localhost:5000/qwe');
  });
});
