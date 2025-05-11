/**
 * 格式化文件大小
 */

export function formatSize(size: number) {
  if (!size) {
    return "未知";
  }
  if (size < 1024) {
    return size + "B";
  }
  else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + "KB";
  }
  else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + "MB";
  }
}
