import { useAtom } from 'jotai';
import { readOnlyAtom, readOnlyImageAtom } from '../../../lib/jotai/user';
import { bodyAtom } from '../../../lib/jotai/article';
import { ImageAndTextData } from '../../../lib/utils/type/comment';
import { getLocalStroage } from '../../../lib/utils/storage';
import { asyncUserAtom } from '../../../lib/jotai/async-atom';

function useImageAndText() {
  const [image] = useAtom(readOnlyImageAtom);
  const imageElement = image && String(image);
  const [text, setBody] = useAtom(bodyAtom);

  const token = getLocalStroage('token');

  if (!!token) {
    const [author] = useAtom(asyncUserAtom);

    return {
      author,
      imageElement,
      text,
      setBody,
    } as ImageAndTextData;
  }

  return { imageElement, text, setBody } as ImageAndTextData;
}

export default useImageAndText;
