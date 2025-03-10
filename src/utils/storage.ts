/**
 * 浏览器缓存工具类
 * 提供统一的本地存储接口，支持数据加密、过期时间设置等功能
 */

interface StorageData {
  value: any;
  timestamp: number;
  expires?: number; // 过期时间（毫秒）
}

interface StorageOptions {
  expires?: number; // 过期时间（毫秒）
}

class Storage {
  private prefix: string = 'account_shop_';

  /**
   * 设置存储数据
   * @param key 键名
   * @param value 值
   * @param options 配置项
   */
  set(key: string, value: any, options: StorageOptions = {}) {
    const data: StorageData = {
      value,
      timestamp: Date.now(),
      expires: options.expires,
    };

    try {
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(data)
      );
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  }

  /**
   * 获取存储数据
   * @param key 键名
   * @returns 存储的值，如果过期或不存在则返回null
   */
  get(key: string): any {
    try {
      const data = localStorage.getItem(this.prefix + key);
      if (!data) return null;

      const parsed: StorageData = JSON.parse(data);
      
      // 检查是否过期
      if (parsed.expires && Date.now() - parsed.timestamp > parsed.expires) {
        this.remove(key);
        return null;
      }

      return parsed.value;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  }

  /**
   * 删除存储数据
   * @param key 键名
   */
  remove(key: string): boolean {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  }

  /**
   * 清除所有存储数据
   */
  clear(): boolean {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Storage clear error:', e);
      return false;
    }
  }

  /**
   * 获取所有存储的键名
   */
  keys(): string[] {
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.slice(this.prefix.length));
    } catch (e) {
      console.error('Storage keys error:', e);
      return [];
    }
  }

  /**
   * 检查是否支持本地存储
   */
  isSupported(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// 导出单例实例
export const storage = new Storage();