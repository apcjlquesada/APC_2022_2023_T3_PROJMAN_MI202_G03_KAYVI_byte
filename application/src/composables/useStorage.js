import { projectStorage } from "src/boot/firebase";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser;

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `anomalies/${file.name}`
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
