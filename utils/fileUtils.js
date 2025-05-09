import * as FileSystem from 'expo-file-system';

export const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

export const initRoot = async () => {
  const info = await FileSystem.getInfoAsync(ROOT_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
  }
};

export const getFileInfo = async (uri) => {
  const stat = await FileSystem.getInfoAsync(uri);
  const name = uri.split('/').pop();
  const extension = name.includes('.') ? name.split('.').pop() : 'folder';
  return {
    name,
    type: extension,
    size: stat.size,
    modified: new Date(stat.modificationTime * 1000).toLocaleString(),
  };
};
